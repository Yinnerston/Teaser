import { View, Button, Text, Image } from "react-native";
import { userAuthAtom } from "../hooks/auth/useUserAuth";
import SignUpScreen from "./auth/SignUpScreen";
import { clearUserAuth } from "../hooks/auth/useUserAuth";
import {
  dequeueAtomAtom,
  enqueueAtomAtom,
  stackPopAtomAtom,
  queueAtom,
} from "../hooks/upload/useMainVideoQueue";
import { useAtom, useSetAtom } from "jotai";
/**
 * Screen for Subscriptions.
 * @returns Currently logged in user's subscriptions.
 * @returns otherwise the AuthScreen to register/login.
 */
export default function SubscriptionsScreen({ navigation }) {
  const [userAuth, setUserAuth] = useAtom(userAuthAtom);

  const setDequeueAtomAtom = useSetAtom(dequeueAtomAtom);
  const setEnqueueAtomAtom = useSetAtom(enqueueAtomAtom);
  const setStackPopAtomAtom = useSetAtom(stackPopAtomAtom);
  const [cameraVideoQueue] = useAtom(queueAtom);
  // const [_dequeuedAtom, _setDequeuedAtoms] = useAtom(dequeuedAtoms)

  const signUpScreen = <SignUpScreen navigation={navigation}></SignUpScreen>;
  const subscriptionsScreen = (
    <View>
      <Button
        onPress={() => {
          clearUserAuth();
          setUserAuth(null);
        }}
        title="logout"
        color="red"
      ></Button>
      <Text>Example Queue behaviour:</Text>
      <Button
        onPress={() => {
          setEnqueueAtomAtom({
            video: {
              duration: 0,
              path: Math.random().toString(),
              size: 0,
            },
            startTime: 0,
            duration: 0,
          });
        }}
        title="ENQUEUE"
        color="red"
      ></Button>
      <Button
        onPress={() => {
          setDequeueAtomAtom();
        }}
        title="DEQUEUE"
        color="red"
      ></Button>
      <Button
        onPress={() => {
          setStackPopAtomAtom();
        }}
        title="STACK POP"
        color="red"
      ></Button>
      {cameraVideoQueue ? (
        cameraVideoQueue.map((item) => {
          return (
            <Image
              source={{ uri: item.frames[0] }}
              style={{ height: 40, width: 40 }}
            />
          );
        })
      ) : (
        <Text>Undefined</Text>
      )}
    </View>
  );

  return userAuth ? subscriptionsScreen : signUpScreen;
}
