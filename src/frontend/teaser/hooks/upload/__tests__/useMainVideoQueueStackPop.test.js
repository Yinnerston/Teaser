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

test("Stack Pop does nothing to an empty list", () => {});

test("Stack pop on only one element in the list", () => {});

test("Stack pop on list with multiple elements", () => {});
