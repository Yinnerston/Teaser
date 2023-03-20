import { atom } from "jotai";
/**
 * Node in the queue
 */
class QVideoNode {
  /**
   * Constructor
   * @param {*} video
   * @param {*} startTime
   * @attribute key
   */
  constructor(video, startTime) {
    this.video = video; // {path: str, duration: float, size: float}
    this.startTime = startTime;
    this.key = Math.floor(Math.random() >> 69696969);
    this.next = null;
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
  const { video, startTime } = update;
  let temp = new QVideoNode(video, startTime);
  const prev = get(rearAtom);
  // If queue is empty, then new node is front and rear both
  if (prev == null) {
    set(rearAtom, temp);
    set(frontAtom, temp);
    return;
  }
  // Enqueue node and change rear
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

// TODO: ReorderItemAtom
// touch frontAtom / rearAtom to rerender list when done
// Write only Function
// Iterate through the queue until key
// this.next = keyNode.next
// keyNode->next = this
