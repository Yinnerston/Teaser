import { Provider, useAtom, useSetAtom } from "jotai";
import {
  reorderAtomAtom,
  enqueueAtomAtom,
  queueAtom,
  dequeueAtomAtom,
  destroyQueueAtomAtom,
  triggerQueueRerenderAtomAtom,
} from "../useMainVideoQueue";
import { START_FROM_PREV_VIDEO_END } from "../../../Constants";
// import renderer from 'react-test-renderer';
import { View, Text, Button } from "react-native";

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

test("TODO:", () => {});
