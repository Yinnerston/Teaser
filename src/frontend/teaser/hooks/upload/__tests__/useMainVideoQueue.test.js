import { Provider, useAtom, useSetAtom } from "jotai";
import {
  reorderAtomAtom,
  enqueueAtomAtom,
  queueAtom,
  dequeueAtomAtom,
  destroyQueueAtomAtom,
} from "../useMainVideoQueue";
import { START_FROM_PREV_VIDEO_END } from "../../../Constants";
// import renderer from 'react-test-renderer';
import { View, Text, Button } from "react-native";
import { render, screen, fireEvent } from "@testing-library/react-native";

jest.mock("../ffmpegWrapper");

export const TestQueue = (props) => {
  const { reorderItemKey, reorderNewIndex } = props;
  const [queue] = useAtom(queueAtom);
  const queueLength = queue ? queue.length : 0;
  const enqueue = useSetAtom(enqueueAtomAtom);
  const reorder = useSetAtom(reorderAtomAtom);
  const dequeue = useSetAtom(dequeueAtomAtom);
  const destroy = useSetAtom(destroyQueueAtomAtom);
  return (
    <View>
      <Text testID="QUEUE">{queue ? queue.map((item) => item.key) : null}</Text>
      <Text testID="LENGTH">{queue ? queueLength : null}</Text>
      <Button
        onPress={() =>
          enqueue({
            video: { path: "", duration: 1000, size: 0 },
            startTime: START_FROM_PREV_VIDEO_END,
          })
        }
        title="ENQUEUE"
      ></Button>
      <Button
        onPress={() =>
          reorder({ itemKey: reorderItemKey, newIndex: reorderNewIndex })
        }
        title="REORDER"
      ></Button>
      <Button onPress={() => dequeue()} title="DEQUEUE"></Button>
      <Button onPress={() => destroy()} title="DESTROY"></Button>
    </View>
  );
};

/**
 * TODO: Hydrate QueueAtom with enqueued values
 * @param {*} param0
 * @returns
 */
const TestProvider = ({ initialValues, children }) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

/**
 * Enqueue 3 nodes
 */
function enqueueThreeNodes() {
  render(<TestQueue></TestQueue>);
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  fireEvent.press(enqueueButton);
  fireEvent.press(enqueueButton);
  render(<TestQueue></TestQueue>);
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
  const initialRender = render(
    <TestQueue reorderItemKey={firstKey} reorderNewIndex={1}></TestQueue>,
  );
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
