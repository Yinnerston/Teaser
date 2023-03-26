import { atom } from "jotai";
import FFmpegWrapper from "./ffmpegWrapper";
import { msToWidth } from "../../utils/videoTimelineWidth";

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
    this.next = null;
  }

  setFrames(frames) {
    this.frames = frames;
  }

  setStartTimeMs(ms) {
    ms = ms + 0.1; // Add 0.1ms offset from the prev video
    this.startTimeMs = ms;
    this.startTimeWidth = msToWidth(ms);
    let endTimeMs = this.startTimeMs + this.video.duration;
    this.endTimeMs = endTimeMs;
    this.endTimeWidth = msToWidth(endTimeMs);
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
    let prevEndTimeMs = 0;
    while (nodeToChange != null) {
      nodeToChange.setStartTimeMs(prevStartTimeMs);
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
  while (front.next != rear) {
    front = front.next;
  }
  // Pop off rear item from 'stack'
  set(dequeuedAtoms, [...prev, front.next]);
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
// TODO: ReorderItemAtom
// touch frontAtom / rearAtom to rerender list when done
// Write only Function
// Iterate through the queue until key
// this.next = keyNode.next
// keyNode->next = this
