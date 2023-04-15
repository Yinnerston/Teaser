import { render, screen, fireEvent } from "@testing-library/react-native";
import {
  TestQueue,
  checkTimingIsEqual,
  checkTimingUpdated,
} from "./useMainVideoQueue.test";

const FIRST_NODE_DURATION = 1000;
const SECOND_NODE_DURATION = 2000;
const THIRD_NODE_DURATION = 3000;

/**
 * Enqueue 3 nodes
 */
function enqueueThreeNodes() {
  render(
    <TestQueue
      enqueueVideoList={[
        { video: { path: "", duration: FIRST_NODE_DURATION } },
        { video: { path: "", duration: SECOND_NODE_DURATION } },
        { video: { path: "", duration: THIRD_NODE_DURATION } },
      ]}
    ></TestQueue>,
  );
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  // render(<TestQueue></TestQueue>);
  // let lengthElement = screen.getByTestId("LENGTH")
  // let length = lengthElement.children[0]
  // expect(length).toBe("3")
}

/**
 * Setup test data
    // const tree = renderer.create(<TestQueue></TestQueue>)
    // console.log(tree.toJSON())
 */
beforeEach(() => {
  enqueueThreeNodes();
});

/**
 * Tear down test data.
 */
afterEach(() => {
  render(<TestQueue></TestQueue>);
  const destroyQueueButton = screen.getByText("DESTROY");
  fireEvent.press(destroyQueueButton);
});

test("Test reordering with a single node", () => {
  const stackPopButton = screen.getByText("STACKPOP");
  fireEvent.press(stackPopButton);
  fireEvent.press(stackPopButton);
  // Only one node in queue
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("1");
  let queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  let firstNode = queue[0];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstNode.key} reorderNewIndex={0}></TestQueue>,
  );
  // Check queue is the same after reordering
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedLengthElement = reorderedRender.getByTestId("LENGTH");
  let reorderedLength = reorderedLengthElement.children[0];
  expect(reorderedLength).toBe("1");
  let reorderedQueue = JSON.parse(
    reorderedRender.getByTestId("QUEUE").children,
  );
  let reorderedFirstKey = reorderedQueue[0].key;
  expect(reorderedFirstKey).toEqual(firstNode.key);
  // Check the startTimes and endTimes are the same are the same
  checkTimingIsEqual(reorderedQueue[0], firstNode);
});

test("Test reorderQueueAtom reorder reverse order by moving first element", () => {
  // Reduce queue to length = 2
  const stackPopButton = screen.getByText("STACKPOP");
  fireEvent.press(stackPopButton);
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("2");
  let queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  let firstNode = queue[0];
  let secondNode = queue[1];
  // Swap the order of the first and second key and check
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstNode.key} reorderNewIndex={1}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = JSON.parse(
    reorderedRender.getByTestId("QUEUE").children,
  );
  expect(reorderedQueue.length).toBe(2);
  expect(reorderedQueue[0].key).toBe(secondNode.key);
  expect(reorderedQueue[1].key).toBe(firstNode.key);
  // Check the startTimes have been adjusted
  checkTimingUpdated(reorderedQueue[0], 0);
  checkTimingUpdated(reorderedQueue[1], SECOND_NODE_DURATION + 1);
});

test("Test reorderQueueAtom reorder reverse order by moving rear element", () => {
  // Reduce queue to length = 2
  const stackPopButton = screen.getByText("STACKPOP");
  fireEvent.press(stackPopButton);
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("2");
  let queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  let firstNode = queue[0];
  let secondNode = queue[1];
  // Swap the order of the first and second key and check
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={secondNode.key} reorderNewIndex={0}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = JSON.parse(
    reorderedRender.getByTestId("QUEUE").children,
  );
  expect(reorderedQueue[0].key).toBe(secondNode.key);
  expect(reorderedQueue[1].key).toBe(firstNode.key);
  // Check the startTimes have been adjusted
  checkTimingUpdated(reorderedQueue[0], 0);
  checkTimingUpdated(reorderedQueue[1], SECOND_NODE_DURATION + 1);
});

test("Test reorderQueueAtom reorder same index", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  let firstNode = queue[0];
  let secondNode = queue[1];
  let thirdNode = queue[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstNode.key} reorderNewIndex={0}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = JSON.parse(
    reorderedRender.getByTestId("QUEUE").children,
  );
  expect(reorderedQueue[0].key).toBe(firstNode.key);
  expect(reorderedQueue[1].key).toBe(secondNode.key);
  expect(reorderedQueue[2].key).toBe(thirdNode.key);
  // Check the startTimes have been adjusted
  checkTimingUpdated(reorderedQueue[0], 0);
  checkTimingUpdated(reorderedQueue[1], FIRST_NODE_DURATION + 1);
  checkTimingUpdated(
    reorderedQueue[2],
    FIRST_NODE_DURATION + SECOND_NODE_DURATION + 2,
  );
});

test("Test reorderQueueAtom reorder invalid index negative", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  let firstNode = queue[0];
  let secondNode = queue[1];
  let thirdNode = queue[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstNode.key} reorderNewIndex={-1}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = JSON.parse(
    reorderedRender.getByTestId("QUEUE").children,
  );
  expect(reorderedQueue[0].key).toBe(firstNode.key);
  expect(reorderedQueue[1].key).toBe(secondNode.key);
  expect(reorderedQueue[2].key).toBe(thirdNode.key);
  // Check the startTimes have been adjusted
  checkTimingUpdated(reorderedQueue[0], 0);
  checkTimingUpdated(reorderedQueue[1], FIRST_NODE_DURATION + 1);
  checkTimingUpdated(
    reorderedQueue[2],
    FIRST_NODE_DURATION + SECOND_NODE_DURATION + 2,
  );
});

test("Test reorderQueueAtom reorder invalid index too large", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  let firstNode = queue[0];
  let secondNode = queue[1];
  let thirdNode = queue[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstNode.key} reorderNewIndex={3}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = JSON.parse(
    reorderedRender.getByTestId("QUEUE").children,
  );
  expect(reorderedQueue[0].key).toBe(firstNode.key);
  expect(reorderedQueue[1].key).toBe(secondNode.key);
  expect(reorderedQueue[2].key).toBe(thirdNode.key);
  // Check the startTimes have been adjusted
  checkTimingUpdated(reorderedQueue[0], 0);
  checkTimingUpdated(reorderedQueue[1], FIRST_NODE_DURATION + 1);
  checkTimingUpdated(
    reorderedQueue[2],
    FIRST_NODE_DURATION + SECOND_NODE_DURATION + 2,
  );
});

test("Test reorderQueueAtom reorder in middle of queue.\
 Thus queue is rerendered on reorder features reordering not related to front / rear atoms.", () => {
  render(<TestQueue></TestQueue>);
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("4");
  let queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  let secondNode = queue[1];
  let thirdNode = queue[2];
  // Reorder queue [0, 1, 2, 3] => [0, 2, 1, 3]
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={secondNode.key} reorderNewIndex={2}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  // Queue jotai atom was changed by reorder
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = JSON.parse(
    reorderedRender.getByTestId("QUEUE").children,
  );
  expect(reorderedQueue[1].key).toBe(thirdNode.key);
  expect(reorderedQueue[2].key).toBe(secondNode.key);
  // Check the startTimes have been adjusted
  checkTimingUpdated(reorderedQueue[0], 0);
  checkTimingUpdated(reorderedQueue[1], FIRST_NODE_DURATION + 1);
  checkTimingUpdated(
    reorderedQueue[2],
    FIRST_NODE_DURATION + THIRD_NODE_DURATION + 2,
  );
  checkTimingUpdated(
    reorderedQueue[3],
    FIRST_NODE_DURATION + THIRD_NODE_DURATION + SECOND_NODE_DURATION + 3,
  );
});

test("Rear atom to middle of queue reordering", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  let firstNode = queue[0];
  let secondNode = queue[1];
  let thirdNode = queue[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={thirdNode.key} reorderNewIndex={1}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = JSON.parse(
    reorderedRender.getByTestId("QUEUE").children,
  );
  expect(reorderedQueue[0].key).toBe(firstNode.key);
  expect(reorderedQueue[1].key).toBe(thirdNode.key);
  expect(reorderedQueue[2].key).toBe(secondNode.key);
  // Check the startTimes have been adjusted
  checkTimingUpdated(reorderedQueue[0], 0);
  checkTimingUpdated(reorderedQueue[1], FIRST_NODE_DURATION + 1);
  checkTimingUpdated(
    reorderedQueue[2],
    FIRST_NODE_DURATION + THIRD_NODE_DURATION + 2,
  );
});

// TODO: rewrite all the tests to be dependent on one variable not screen
test("Front atom to middle of queue reordering", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  let firstNode = queue[0];
  let secondNode = queue[1];
  let thirdNode = queue[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstNode.key} reorderNewIndex={1}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);

  let reorderedQueue = JSON.parse(
    reorderedRender.getByTestId("QUEUE").children,
  );

  expect(reorderedQueue[0].key).toBe(secondNode.key);
  expect(reorderedQueue[1].key).toBe(firstNode.key);
  expect(reorderedQueue[2].key).toBe(thirdNode.key);
  // Check the startTimes have been adjusted
  checkTimingUpdated(reorderedQueue[0], 0);
  checkTimingUpdated(reorderedQueue[1], SECOND_NODE_DURATION + 1);
  checkTimingUpdated(
    reorderedQueue[2],
    FIRST_NODE_DURATION + SECOND_NODE_DURATION + 2,
  );
});

test("Reorder across queue forwards", () => {
  // Move a video from the rear to the front incrementally by one index
  render(<TestQueue></TestQueue>);
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("4");
  // Get all four keys in queue
  // Make deep copy of queue element
  let queue = [];
  let _queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  for (let i = 0; i < _queue.length; i++) {
    queue[i] = _queue[i];
  }
  let nodeToReorder = queue[0];

  // Go through all the indexes [0, length - 1] in reverse
  for (let newIndex = 0; newIndex < length - 1; newIndex++) {
    const reorderPropRerender = render(
      <TestQueue
        reorderItemKey={nodeToReorder.key}
        reorderNewIndex={newIndex}
      ></TestQueue>,
    );
    const reorderButton = reorderPropRerender.getByText("REORDER");
    fireEvent.press(reorderButton);
    const reorderedRender = render(<TestQueue></TestQueue>);
    let reorderedQueue = JSON.parse(
      reorderedRender.getByTestId("QUEUE").children,
    );
    let reorderedLength = initialRender.getByTestId("LENGTH").children[0];
    // Check values match expected
    expect(reorderedLength).toBe(queue.length.toString());
    let startTime = 0;
    for (let i = 0; i < length; i++) {
      if (i == newIndex) {
        expect(reorderedQueue[i].key).toBe(nodeToReorder.key);
      } else if (i < newIndex) {
        // i > newIndex so reordered was shifted up by one index by reorder
        expect(reorderedQueue[i].key).toBe(queue[i + 1].key);
      } else {
        // Should be the original value before any reordering
        expect(reorderedQueue[i].key).toBe(queue[i].key);
      }
      checkTimingUpdated(reorderedQueue[i], startTime);
      startTime += reorderedQueue[i].video.duration + 1;
    }
  }
});

test("Reorder across queue backwards", () => {
  // Move a video from the rear to the front incrementally by one index
  render(<TestQueue></TestQueue>);
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("4");
  // Get all four keys in queue
  // Make deep copy of queue element
  let queue = [];
  let _queue = JSON.parse(initialRender.getByTestId("QUEUE").children);
  for (let i = 0; i < _queue.length; i++) {
    queue[i] = _queue[i];
  }
  let nodeToReorder = queue[3];

  // Go through all the indexes [0, length - 1] in reverse
  for (let newIndex = length - 1; newIndex >= 0; newIndex--) {
    const reorderPropRerender = render(
      <TestQueue
        reorderItemKey={nodeToReorder.key}
        reorderNewIndex={newIndex}
      ></TestQueue>,
    );
    const reorderButton = reorderPropRerender.getByText("REORDER");
    fireEvent.press(reorderButton);
    const reorderedRender = render(<TestQueue></TestQueue>);
    let reorderedQueue = JSON.parse(
      reorderedRender.getByTestId("QUEUE").children,
    );
    let reorderedLength = initialRender.getByTestId("LENGTH").children[0];
    // Check values match expected
    expect(reorderedLength).toBe(queue.length.toString());
    let startTime = 0;
    for (let i = 0; i < length; i++) {
      if (i == newIndex) {
        expect(reorderedQueue[i].key).toBe(nodeToReorder.key);
      } else if (i < newIndex) {
        // Should be the original value before any reordering
        expect(reorderedQueue[i].key).toBe(queue[i].key);
      } else {
        // i > newIndex so reordered was shifted up by one index by reorder
        expect(reorderedQueue[i].key).toBe(queue[i - 1].key);
      }
      checkTimingUpdated(reorderedQueue[i], startTime);
      startTime += reorderedQueue[i].video.duration + 1;
    }
  }
});

test("Test triggerQueueRerenderAtomAtom on empty queue", () => {
  // Remove all elements from queue
  const destroyQueueButton = screen.getByText("DESTROY");
  fireEvent.press(destroyQueueButton);
  const initialRender = render(<TestQueue />);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("0");
  const rerenderButton = screen.getByText("RERENDER");
  fireEvent.press(rerenderButton);
  // Check that nothing has changed and the queue still has 0 elements after rerender
  const rerenderedRender = render(<TestQueue></TestQueue>);
  let lengthElementAfterRerender = rerenderedRender.getByTestId("LENGTH");
  let lengthAfterRerender = lengthElementAfterRerender.children[0];
  expect(lengthAfterRerender).toBe("0");
});

test("Test triggerQueueRerenderAtomAtom on queue with nodes", () => {
  const rerenderButton = screen.getByText("RERENDER");
  fireEvent.press(rerenderButton);
  // Check that nothing has changed and the queue still has 3 elements after rerender
  const rerenderedRender = render(<TestQueue></TestQueue>);
  let lengthElementAfterRerender = rerenderedRender.getByTestId("LENGTH");
  let lengthAfterRerender = lengthElementAfterRerender.children[0];
  expect(lengthAfterRerender).toBe("3");
});
