import { render, screen, fireEvent } from "@testing-library/react-native";
import { TestQueue } from "./useMainVideoQueue.test";

/**
 * Enqueue 3 nodes
 */
function enqueueThreeNodes() {
  render(<TestQueue></TestQueue>);
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  fireEvent.press(enqueueButton);
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
  const dequeueButton = screen.getByText("DEQUEUE");
  fireEvent.press(dequeueButton);
  fireEvent.press(dequeueButton);
  // Only one node in queue
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("1");
  let queue = initialRender.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstKey} reorderNewIndex={0}></TestQueue>,
  );
  // Check queue is the same after reordering
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedLengthElement = reorderedRender.getByTestId("LENGTH");
  let reorderedLength = reorderedLengthElement.children[0];
  expect(reorderedLength).toBe("1");
  let reorderedQueue = reorderedRender.getByTestId("QUEUE");
  let reorderedFirstKey = reorderedQueue.children[0];
  expect(reorderedFirstKey).toEqual(firstKey);
});

test("Test reorderQueueAtom reorder reverse order by moving first element", () => {
  // Reduce queue to length = 2
  const dequeueButton = screen.getByText("DEQUEUE");
  fireEvent.press(dequeueButton);
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("2");
  let queue = initialRender.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  let secondKey = queue.children[1];
  // Swap the order of the first and second key and check
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstKey} reorderNewIndex={1}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = reorderedRender.getByTestId("QUEUE");
  expect(reorderedQueue.children.length).toBe(2);
  expect(reorderedQueue.children[0]).toBe(secondKey);
  expect(reorderedQueue.children[1]).toBe(firstKey);
});

test("Test reorderQueueAtom reorder reverse order by moving rear element", () => {
  // Reduce queue to length = 2
  const dequeueButton = screen.getByText("DEQUEUE");
  fireEvent.press(dequeueButton);
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("2");
  let queue = initialRender.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  let secondKey = queue.children[1];
  // Swap the order of the first and second key and check
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={secondKey} reorderNewIndex={0}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = reorderedRender.getByTestId("QUEUE");
  expect(reorderedQueue.children[0]).toBe(secondKey);
  expect(reorderedQueue.children[1]).toBe(firstKey);
});

test("Test reorderQueueAtom reorder same index", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = initialRender.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  let secondKey = queue.children[1];
  let thirdKey = queue.children[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstKey} reorderNewIndex={0}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = reorderedRender.getByTestId("QUEUE");
  expect(reorderedQueue.children[0]).toBe(firstKey);
  expect(reorderedQueue.children[1]).toBe(secondKey);
  expect(reorderedQueue.children[2]).toBe(thirdKey);
});

test("Test reorderQueueAtom reorder invalid index negative", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = initialRender.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  let secondKey = queue.children[1];
  let thirdKey = queue.children[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstKey} reorderNewIndex={-1}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = reorderedRender.getByTestId("QUEUE");
  expect(reorderedQueue.children[0]).toBe(firstKey);
  expect(reorderedQueue.children[1]).toBe(secondKey);
  expect(reorderedQueue.children[2]).toBe(thirdKey);
});

test("Test reorderQueueAtom reorder invalid index too large", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = initialRender.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  let secondKey = queue.children[1];
  let thirdKey = queue.children[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstKey} reorderNewIndex={3}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = reorderedRender.getByTestId("QUEUE");
  expect(reorderedQueue.children[0]).toBe(firstKey);
  expect(reorderedQueue.children[1]).toBe(secondKey);
  expect(reorderedQueue.children[2]).toBe(thirdKey);
});

test("Test reorderQueueAtom reorder in middle of queue.\
 Thus queue is rerendered on reorder features reordering not related to front / rear atoms.", () => {
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("4");
  let queue = initialRender.getByTestId("QUEUE");
  let secondKey = queue.children[1];
  let thirdKey = queue.children[2];
  // Reorder queue [0, 1, 2, 3] => [0, 2, 1, 3]
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={secondKey} reorderNewIndex={2}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  // Queue jotai atom was changed by reorder
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = reorderedRender.getByTestId("QUEUE");
  expect(reorderedQueue.children[1]).toBe(thirdKey);
  expect(reorderedQueue.children[2]).toBe(secondKey);
});

test("Rear atom to middle of queue reordering", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = initialRender.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  let secondKey = queue.children[1];
  let thirdKey = queue.children[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={thirdKey} reorderNewIndex={1}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);
  let reorderedQueue = reorderedRender.getByTestId("QUEUE");
  expect(reorderedQueue.children[0]).toBe(firstKey);
  expect(reorderedQueue.children[1]).toBe(thirdKey);
  expect(reorderedQueue.children[2]).toBe(secondKey);
});

// TODO: rewrite all the tests to be dependent on one variable not screen
test("Front atom to middle of queue reordering", () => {
  const initialRender = render(<TestQueue></TestQueue>);
  let queue = initialRender.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  let secondKey = queue.children[1];
  let thirdKey = queue.children[2];
  const reorderPropRerender = render(
    <TestQueue reorderItemKey={firstKey} reorderNewIndex={1}></TestQueue>,
  );
  const reorderButton = reorderPropRerender.getByText("REORDER");
  fireEvent.press(reorderButton);
  const reorderedRender = render(<TestQueue></TestQueue>);

  let reorderedQueue = reorderedRender.getByTestId("QUEUE");

  expect(reorderedQueue.children[0]).toBe(secondKey);
  expect(reorderedQueue.children[1]).toBe(firstKey);
  expect(reorderedQueue.children[2]).toBe(thirdKey);
});

test("Reorder across queue", () => {
  // Move a video from the rear to the front incrementally by one index
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  const initialRender = render(<TestQueue></TestQueue>);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("4");
  // Get all four keys in queue
  // Make deep copy of queue element
  let queue = [];
  let _queue = initialRender.getByTestId("QUEUE");
  for (let i = 0; i < _queue.children.length; i++) {
    queue[i] = _queue.children[i];
  }
  let keyToReorder = queue[3];

  // Go through all the indexes [0, length - 1] in reverse
  for (let newIndex = length - 1; newIndex >= 0; newIndex--) {
    const reorderPropRerender = render(
      <TestQueue
        reorderItemKey={keyToReorder}
        reorderNewIndex={newIndex}
      ></TestQueue>,
    );
    const reorderButton = reorderPropRerender.getByText("REORDER");
    fireEvent.press(reorderButton);
    const reorderedRender = render(<TestQueue></TestQueue>);
    let reorderedQueue = reorderedRender.getByTestId("QUEUE").children;
    let reorderedLength = initialRender.getByTestId("LENGTH").children[0];
    // Check values match expected
    expect(reorderedLength).toBe(queue.length.toString());
    for (let i = 0; i < length; i++) {
      if (i == newIndex) {
        expect(reorderedQueue[i]).toBe(keyToReorder);
      } else if (i < newIndex) {
        // Should be the original value before any reordering
        expect(reorderedQueue[i]).toBe(queue[i]);
      } else {
        // i > newIndex so reordered was shifted up by one index by reorder
        console.log(queue, reorderedQueue);

        expect(reorderedQueue[i]).toBe(queue[i - 1]);
      }
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
