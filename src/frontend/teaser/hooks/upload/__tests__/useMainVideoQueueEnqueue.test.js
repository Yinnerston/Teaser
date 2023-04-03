import { render, screen, fireEvent } from "@testing-library/react-native";
import { TestQueue } from "./useMainVideoQueue.test";

/**
 * Tear down test data.
 */
afterEach(() => {
  render(<TestQueue></TestQueue>);
  const destroyQueueButton = screen.getByText("DESTROY");
  fireEvent.press(destroyQueueButton);
});

test("Test Enqueue on Empty Queue", () => {
  const initialRender = render(<TestQueue />);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("0");
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  const enqueuedRender = render(<TestQueue></TestQueue>);
  let enqueuedLengthElement = enqueuedRender.getByTestId("LENGTH");
  let enqueuedLength = enqueuedLengthElement.children[0];
  expect(enqueuedLength).toBe("1");
});

test("Test Enqueue Multiple Times Sequentially", () => {
  const initialRender = render(<TestQueue />);
  let lengthElement = initialRender.getByTestId("LENGTH");
  let length = lengthElement.children[0];
  expect(length).toBe("0");
  const enqueueButton = screen.getByText("ENQUEUE");
  fireEvent.press(enqueueButton);
  fireEvent.press(enqueueButton);
  fireEvent.press(enqueueButton);
  const enqueuedRender = render(<TestQueue></TestQueue>);
  let enqueuedLengthElement = enqueuedRender.getByTestId("LENGTH");
  let enqueuedLength = enqueuedLengthElement.children[0];
  expect(enqueuedLength).toBe("3");
});

// TODO:
// test("Test Enqueue duration exceeding 15 seconds", () =>    {
//     const initialRender = render(<TestQueue enqueueVideoList={[{video: {path: "", duration: 10000}}, {video: {path: "", duration: 6000}}]} />);
//     const enqueueButton = screen.getByText("ENQUEUE");
//     expect(fireEvent.press(enqueueButton)).toThrowError();
// })
