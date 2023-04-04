import { atom } from "jotai";
import FFmpegWrapper from "./ffmpegWrapper";
import { msToWidth } from "../../utils/videoTimelineWidth";
import { VIDEO_QUEUE_STACK_POP_TRIGGER_RERENDER_UPDATE } from "../../Constants";
const getFileNameFromPath = (path) => {
  const fragments = path.split("/");
  let fileName = fragments[fragments.length - 1];
  fileName = fileName.split(".")[0];
  return fileName;
};

/**
 * Node in the queue
 */
class QVideoNode {
  /**
   * Constructor
   * @param {*} video
   * @param {*} startTime
   * @attribute key
   * @attribute timelineImages
   */
  constructor(video) {
    // ID
    this.key = Math.floor(Math.random() * 6942069);
    this.video = video; // {path: str, duration: float, size: float}
    this.startTimeMs = 0;
    // Variables to reduce computation
    this.startTimeWidth = 0;
    this.endTimeMs = 0;
    this.endTimeWidth = 0;
    this.durationWidth = msToWidth(video.duration);
    // Frames displayed in timeline
    // TODO: Wait until these are rendered to load timeline?
    this.numberOfFrames = Math.ceil(video.duration / 1000);
    this.frames = [];
    if (!video.triggerRerender) {
      FFmpegWrapper.getFrames(
        getFileNameFromPath(video.path),
        video.path,
        this.numberOfFrames,
        (filePath) => {
          const _frames = [];
          for (let i = 0; i < this.numberOfFrames; i++) {
            _frames.push(
              `${filePath.replace("%4d", String(i + 1).padStart(4, 0))}`,
            );
          }
          console.log("FRAMES", _frames);
          this.setFrames(_frames);
        },
        (e) => console.error(e),
      );
    }

    this.next = null;
  }

  setFrames(frames) {
    this.frames = frames;
  }

  setStartTimeMs(ms) {
    if (ms > 0) {
      ms = ms + 1; // Add 0.1ms offset from the prev video
    }
    this.startTimeMs = ms;
    this.startTimeWidth = msToWidth(ms);
    let endTimeMs = this.startTimeMs + this.video.duration;
    this.endTimeMs = endTimeMs;
    this.endTimeWidth = msToWidth(endTimeMs);
    // TODO: Check if enqueued atom exceeds the maximum duration of a video?
  }
}

/**
 * Atom at the head of the queue
 */
export const frontAtom = atom(null);
/**
 * Atom at the back fo the queue
 */
const rearAtom = atom(null);

/**
 * Items that are dequed are put here
 */
export const dequeuedAtoms = atom([]);

/**
 * Read only atom that returns the queue in order
 */
export const queueAtom = atom((get) => {
  // Trigger rerender on frontAtom or rearAtom change
  let front = get(frontAtom);
  let rear = get(rearAtom);
  // Return undefined if no items in queue
  if (front == null) return;
  // Iterate through queue to get all items in sequence
  let queue = [];
  while (front != null) {
    queue.push(front);
    front = front.next;
  }
  return queue;
});

/**
 * Write only Enqueue atom
 * @param {video, startTime} update
 */
export const enqueueAtomAtom = atom(null, (get, set, update) => {
  // Create a new LL node
  const { video } = update;
  let temp = new QVideoNode(video);
  const prev = get(rearAtom);
  // If queue is empty, then new node is front and rear both
  if (prev == null) {
    temp.setStartTimeMs(0);
    set(rearAtom, temp);
    set(frontAtom, temp);
    return;
  }
  // Enqueue node and change rear
  temp.setStartTimeMs(prev.startTimeMs + prev.video.duration);
  prev.next = temp;
  set(rearAtom, temp);
});

/**
 * TODO: Not so sure about the get
 * Dequeue an atom.
 */
export const dequeueAtomAtom = atom(
  (get) => get(dequeuedAtoms).slice(-1),
  (get, set, update) => {
    let front = get(frontAtom);
    const prev = get(dequeuedAtoms);
    // Nothing in queue return undefined
    if (front == null) return;
    // Replace front of queue and add the key to dequeuedAtoms
    let temp = front.next;
    set(dequeuedAtoms, [...prev, front]);
    set(frontAtom, temp);
    // Change the startTimeMs and startTimeWidth of the elements in queue
    let nodeToChange = temp;
    var prevEndTimeMs = 0;
    while (nodeToChange != null) {
      nodeToChange.setStartTimeMs(prevEndTimeMs);
      prevEndTimeMs = nodeToChange.startTimeMs + nodeToChange.video.duration; // start 1ms after prev video
      nodeToChange = nodeToChange.next;
    }
    // Set the rear to null if temp is null
    if (temp == null) {
      set(rearAtom, null);
    }
  },
);

/**
 * Gives stack-like pop functionality to the queue.
 */
export const stackPopAtomAtom = atom(null, (get, set, update) => {
  let front = get(frontAtom);
  let rear = get(rearAtom);
  const prev = get(dequeuedAtoms);
  // Return undefined if no items in queue
  if (rear == null) return;
  // Only one item in the queue
  if (front == rear) {
    set(frontAtom, null);
    set(rearAtom, null);
    return;
  }
  // Iterate through queue to get all items in sequence
  while (front.next != null && front.next != rear) {
    front = front.next;
  }
  // Pop off rear item from 'stack'
  if (update != VIDEO_QUEUE_STACK_POP_TRIGGER_RERENDER_UPDATE) {
    set(dequeuedAtoms, [...prev, front.next]);
  }
  front.next = null;
  set(rearAtom, front);
});

export const queueDurationMsAtom = atom((get) => {
  let queue = get(queueAtom);
  let queueDuration = queue.reduce(
    (partialDuration, item) => partialDuration + item.video.duration,
    0,
  );
  return queueDuration;
});

/**
 * Delete a node and reinsert it at a given index
 * https://stackoverflow.com/questions/62640833/move-node-to-a-new-index-in-a-linked-list
 */
export const reorderAtomAtom = atom(null, (get, set, update) => {
  const { itemKey, newIndex } = update;
  let initialFront = get(frontAtom),
    frontAfterDelete = initialFront,
    toDelete = get(frontAtom),
    prevBeforeReorder = null,
    prevAfterReorder = null;
  let initialRear = get(rearAtom);
  var newFrontAtom = initialFront;
  var newRearAtom = initialRear;
  let queueLength = get(queueAtom).length;
  if (initialFront == null) {
    // If no nodes in queue, do nothing
    return;
  } else if (initialFront.key == initialRear.key) {
    // Only one node in the queue, do nothing
    return;
  } else if (newIndex < 0 || newIndex > queueLength - 1) {
    // Reject invalid newIndex
    return;
  }
  // Walk through the queue and delete the node
  var index = 0;
  while (toDelete != null) {
    if (toDelete.key == itemKey) {
      if (prevBeforeReorder != null) {
        prevBeforeReorder.next = toDelete.next;
      } else {
        // toDelete is at initialFront of queue
        frontAfterDelete = initialFront.next;
      }
      break;
    }
    prevBeforeReorder = toDelete;
    toDelete = toDelete.next;
    index++;
  }
  // Could not find key
  if (toDelete == null) {
    console.error(
      "Invalid Key",
      get(queueAtom).map((item) => item.key),
      itemKey,
    ); // TODO: ?
    return;
  }
  // Insert node at newIndex
  newFrontAtom = frontAfterDelete;
  let curr = frontAfterDelete;
  let newIndexIter = newIndex;
  while (newIndexIter != 0) {
    prevAfterReorder = curr;
    curr = curr.next;
    newIndexIter--;
  }
  if (prevAfterReorder != null) {
    prevAfterReorder.next = toDelete;
    toDelete.next = curr;
    if (toDelete.key == initialRear.key) {
      // If deleted was previously the rear, set new rear
      newRearAtom = curr;
    }
  } else if (newFrontAtom != null) {
    toDelete.next = newFrontAtom;
    newFrontAtom = toDelete;
  }
  // Update initialFront / rearAtom
  if (toDelete != null && toDelete.next == null) {
    // toDelete is the new rearAtom
    newRearAtom = toDelete;
  }
  if (newFrontAtom == initialFront && newRearAtom == initialRear) {
    // Trigger rerender if reordering did not involve either the front or rear atom
    set(triggerQueueRerenderAtomAtom, null);
  } else {
    set(frontAtom, newFrontAtom);
    set(rearAtom, newRearAtom);
  }
  // Set the new startTimeMs
  var startTime = 0;
  curr = newFrontAtom;
  // Update the start times after reorder
  while (curr != null) {
    curr.setStartTimeMs(startTime);
    startTime = curr.endTimeMs;
    curr = curr.next;
  }

  // // DEBUG:
  // toDelete ? console.log("toDelete", toDelete.key, "next", toDelete.next ? toDelete.next.key : "null") : console.log("toDelete")
  // newIndex > -1 ? console.log("newIndex", newIndex) : console.log("newIndex")
  // prevBeforeReorder ? console.log("prevBeforeReorder", prevBeforeReorder.key) : console.log("prevBeforeReorder")
  // prevAfterReorder ? console.log("prevAfterReorder", prevAfterReorder.key) : console.log("prevAfterReorder")
  // initialFront ? console.log("initialFront", initialFront.key) : console.log("initialFront")
  // curr ? console.log("curr", curr.key) : console.log("curr")
  // newFrontAtom ? console.log("newFrontAtom", newFrontAtom.key) : console.log("newFrontAtom")
  // newRearAtom ? console.log("newRearAtom", newRearAtom.key) : console.log("newRearAtom")
  // get(frontAtom) ? console.log("get(frontAtom)", get(frontAtom).key) : console.log("get(frontAtom)")
  // get(rearAtom) ? console.log("get(rearAtom)", get(rearAtom).key) : console.log("get(rearAtom)")
  // console.log("QUEUE", get(queueAtom).map((item) => item.key))
});

export const destroyQueueAtomAtom = atom(null, (get, set, _update) => {
  set(frontAtom, null);
  set(rearAtom, null);
  set(dequeuedAtoms, []);
});

export const triggerQueueRerenderAtomAtom = atom(null, (get, set, _update) => {
  set(enqueueAtomAtom, {
    video: { triggerRerender: VIDEO_QUEUE_STACK_POP_TRIGGER_RERENDER_UPDATE },
  });
  set(stackPopAtomAtom, VIDEO_QUEUE_STACK_POP_TRIGGER_RERENDER_UPDATE);
  let dequeued = get(dequeuedAtoms);
  dequeued.pop();
  set(dequeuedAtoms, dequeued);
});
