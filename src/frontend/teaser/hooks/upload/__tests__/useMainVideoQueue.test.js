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

test("Test reorderQueueAtom reorder reverse order by moving first element", () => {
  // Reduce queue to length = 2
  const dequeueButton = screen.getByText("DEQUEUE");
  fireEvent.press(dequeueButton);
  const { rerender } = render(<TestQueue></TestQueue>);
  let lengthElement = screen.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("2");
  let queue = screen.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  let secondKey = queue.children[1];
  // Swap the order of the first and second key and check
  rerender(
    <TestQueue reorderItemKey={firstKey} reorderNewIndex={1}></TestQueue>,
  );
  const reorderButton = screen.getByText("REORDER");
  fireEvent.press(reorderButton);
  rerender(<TestQueue></TestQueue>);
  let reorderedQueue = screen.getByTestId("QUEUE");
  expect(reorderedQueue.children[0]).toBe(secondKey);
  expect(reorderedQueue.children[1]).toBe(firstKey);
});

test("Test reorderQueueAtom reorder reverse order by moving rear element", () => {
  // Reduce queue to length = 2
  const dequeueButton = screen.getByText("DEQUEUE");
  fireEvent.press(dequeueButton);
  const { rerender } = render(<TestQueue></TestQueue>);
  let lengthElement = screen.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("2");
  let queue = screen.getByTestId("QUEUE");
  let firstKey = queue.children[0];
  let secondKey = queue.children[1];
  // Swap the order of the first and second key and check
  rerender(
    <TestQueue reorderItemKey={secondKey} reorderNewIndex={0}></TestQueue>,
  );
  const reorderButton = screen.getByText("REORDER");
  fireEvent.press(reorderButton);
  rerender(<TestQueue></TestQueue>);
  let reorderedQueue = screen.getByTestId("QUEUE");
  expect(reorderedQueue.children[0]).toBe(secondKey);
  expect(reorderedQueue.children[1]).toBe(firstKey);
});

test("Test reorderQueueAtom reorder order later in queue", () => {});

test("Test reorderQueueAtom reorder previous frontAtom", () => {});

test("Test reorderQueueAtom reorder new frontAtom", () => {});

test("Test reorderQueueAtom reorder previous rearAtom", () => {});

test("Test reorderQueueAtom reorder new rearAtom", () => {});

test("Test reorderQueueAtom reorder same index", () => {});

test("Test reorderQueueAtom reorder invalid index negative", () => {});

test("Test reorderQueueAtom reorder invalid index too large", () => {});
