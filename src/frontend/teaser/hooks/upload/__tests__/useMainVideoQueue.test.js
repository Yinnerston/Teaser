import { Provider, useAtom, useSetAtom } from "jotai";
import {
  reorderAtomAtom,
  enqueueAtomAtom,
  queueAtom,
  dequeueAtomAtom,
  destroyQueueAtomAtom,
  triggerQueueRerenderAtomAtom,
  stackPopAtomAtom,
} from "../useMainVideoQueue";
import { START_FROM_PREV_VIDEO_END } from "../../../Constants";
// import renderer from 'react-test-renderer';
import { View, Text, Button } from "react-native";
import { msToWidth } from "../../../utils/videoTimelineWidth";

jest.mock("../ffmpegWrapper");

/**
 * Test queue
 * @param {enqueueVideoList, reorderItemKey, reorderNewIndex} props
 * @attribute enqueueVideoList : Array of video objects --> [{video: {...}}, {video: {...}},]
 * @returns
 */
export const TestQueue = (props) => {
  const { enqueueVideoList, reorderItemKey, reorderNewIndex } = props;
  const [queue] = useAtom(queueAtom);
  const queueLength = queue ? queue.length : 0;
  const enqueue = useSetAtom(enqueueAtomAtom);
  const reorder = useSetAtom(reorderAtomAtom);
  const dequeue = useSetAtom(dequeueAtomAtom);
  const destroy = useSetAtom(destroyQueueAtomAtom);
  const stackPop = useSetAtom(stackPopAtomAtom);
  const rerender = useSetAtom(triggerQueueRerenderAtomAtom);

  return (
    <View>
      <Text testID="QUEUE">{queue ? JSON.stringify(queue) : []}</Text>
      <Text testID="LENGTH">{queue ? queueLength : 0}</Text>
      <Button
        onPress={() => {
          if (enqueueVideoList != null) {
            for (let i = 0; i < enqueueVideoList.length; i++) {
              enqueue(enqueueVideoList[i]);
            }
          } else {
            // Otherwise enqueue a random variable
            enqueue({
              video: { path: "", duration: 1000, size: 0 },
            });
          }
        }}
        title="ENQUEUE"
      ></Button>
      <Button
        onPress={() =>
          reorder({ itemKey: reorderItemKey, newIndex: reorderNewIndex })
        }
        title="REORDER"
      ></Button>
      <Button onPress={() => dequeue()} title="DEQUEUE"></Button>
      <Button onPress={() => stackPop()} title="STACKPOP"></Button>
      <Button onPress={() => destroy()} title="DESTROY"></Button>
      <Button onPress={() => rerender()} title="RERENDER"></Button>
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
 * Check all the time related attributes between two nodes are equal.
 * @param {*} nodeA
 * @param {*} nodeB
 */
export function checkTimingIsEqual(nodeA, nodeB) {
  expect(nodeA.startTimeMs).toEqual(nodeB.startTimeMs);
  expect(nodeA.endTimeMs).toEqual(nodeB.endTimeMs);
  expect(nodeA.startTimeWidth).toEqual(nodeB.startTimeWidth);
  expect(nodeA.startTimeMs).toEqual(nodeB.startTimeMs);
  expect(nodeA.endTimeWidth).toEqual(nodeB.endTimeWidth);
  expect(nodeA.video.duration).toEqual(nodeB.video.duration);
  expect(nodeA.durationWidth).toEqual(nodeB.durationWidth);
}

/**
 * Check the startTime / endTime variables were updated to a newStartTimeMs
 * @param {*} node
 * @param {*} newStartTimeMs
 */
export function checkTimingUpdated(node, newStartTimeMs) {
  expect(node.startTimeMs).toEqual(newStartTimeMs);
  expect(node.endTimeMs).toEqual(newStartTimeMs + node.video.duration);
  expect(node.startTimeWidth).toEqual(msToWidth(newStartTimeMs));
  expect(node.endTimeWidth).toEqual(
    msToWidth(newStartTimeMs + node.video.duration),
  );
}

test("TODO:", () => {});
