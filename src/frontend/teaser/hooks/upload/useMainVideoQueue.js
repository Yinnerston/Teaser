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
      // // Normalize encoding
      // FFmpegWrapper.normalizeEncoding(
      //   video.path,
      //   (filePath) => {
      //     // Set new video path
      //   },
      //   (e) => console.error(e)
      // )
      // Create video frames used in editor
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

  // TODO: Trim video functionality
  // https://stackoverflow.com/a/42827058
}

/**
 * Atom at the back fo the queue
 */
const rearAtom = atom(null);

export function queueHasNext(queue, itemKey) {
  return queue.findIndex((item) => item.key == itemKey) != -1;
}

export function queueGetNext(queue, itemKey) {
  let index = queue.findIndex((item) => item.key == itemKey);
  if (index != -1 && index < queue.length - 1) {
    return queue[index + 1];
  }
  return null;
}
/**
 * Primitive atom for queue.
 */
export const _queueAtom = atom([]);

/**
 * Atom at the head of the queue
 */
export const frontAtom = atom((get) => {
  const queue = get(_queueAtom);
  var front = null;
  if (queue.length > 0) {
    front = queue[0];
  }
  return front;
});

/**
 * Items that are dequed are put here
 */
export const dequeuedAtoms = atom([]);

/**
 * Read only atom that returns the queue in order
 */
export const queueAtom = atom((get) => {
  return get(_queueAtom);
});

/**
 * Write only Enqueue atom
 * @param {video, startTime} update
 */
export const enqueueAtomAtom = atom(null, (get, set, update) => {
  // Create a new LL node
  const { video } = update;
  let temp = new QVideoNode(video);
  const queue = get(_queueAtom);
  // If queue is empty, then new node is front and rear both
  if (queue.length == 0) {
    temp.setStartTimeMs(0);
  } else {
    // Enqueue node and change rear
    temp.setStartTimeMs(queue.slice(-1)[0].endTimeMs);
  }
  queue.push(temp);
  set(_queueAtom, [...queue]);
});

/**
 * TODO: Not so sure about the get
 * Dequeue an atom.
 */
export const dequeueAtomAtom = atom(
  (get) => get(dequeuedAtoms).slice(-1),
  (get, set, update) => {
    const queue = get(_queueAtom);
    // Nothing in queue return undefined
    if (queue == null || queue.length == 0) return;
    // Replace front of queue and add the key to dequeuedAtoms
    const dequeuedNode = queue.splice(0, 1)[0];
    const dequeuedNodes = get(dequeuedAtoms);
    dequeuedNodes.push(dequeuedNode);
    set(dequeuedAtoms, dequeuedNodes);
    // Change the startTimeMs and startTimeWidth of the elements in queue
    // And the .next attribute
    var prevEndTimeMs = 0;
    for (let i = 0; i < queue.length; i++) {
      queue[i].setStartTimeMs(prevEndTimeMs);
      prevEndTimeMs = queue[i].endTimeMs;
      if (i + 1 < queue.length) {
        queue[i].next = queue[i + 1];
      }
    }
    set(_queueAtom, [...queue]);
  },
);

/**
 * Gives stack-like pop functionality to the queue.
 */
export const stackPopAtomAtom = atom(null, (get, set, update) => {
  const queue = get(_queueAtom);
  // Nothing in queue return undefined
  if (queue == null || queue.length == 0) return;
  // Replace front of queue and add the key to dequeuedAtoms
  const dequeuedNode = queue.pop();
  const dequeuedNodes = get(dequeuedAtoms);
  dequeuedNodes.push(dequeuedNode);
  set(dequeuedAtoms, dequeuedNodes);
  if (queue.length > 0) {
    queue.slice(-1)[0].next = null;
  }
  set(_queueAtom, [...queue]);
});

export const queueDurationMsAtom = atom((get) => {
  const queue = get(_queueAtom);
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
  const queue = get(_queueAtom);
  const initialQueueLength = queue.length;
  const prevIndex = queue.findIndex((item) => item.key == itemKey);
  if (newIndex < 0 || newIndex > initialQueueLength - 1 || prevIndex == -1) {
    // Reject invalid newIndex
    return;
  }
  if (initialQueueLength == 1) {
    // Do nothing when queue only has one element
    return;
  }
  // Remove from queue
  const deletedNode = queue.splice(prevIndex, 1)[0];
  // Add back to queue
  queue.splice(newIndex, 0, deletedNode);
  // Reset the timings
  var prevEndTimeMs = 0;
  for (let i = 0; i < queue.length; i++) {
    queue[i].setStartTimeMs(prevEndTimeMs);
    prevEndTimeMs = queue[i].endTimeMs;
    if (i + 1 < queue.length) {
      queue[i].next = queue[i + 1];
    }
  }
  queue.slice(-1)[0].next = null;
  set(_queueAtom, [...queue]);
});

export const destroyQueueAtomAtom = atom(null, (get, set, _update) => {
  set(_queueAtom, []);
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
