import { View, Button, Text } from "react-native";
import { userAuthAtom } from "../hooks/auth/useUserAuth";
import SignUpScreen from "./auth/SignUpScreen";
import { clearUserAuth } from "../hooks/auth/useUserAuth";
import {
  dequeueAtomAtom,
  enqueueAtomAtom,
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

  const _setDequeueAtomAtom = useSetAtom(dequeueAtomAtom);
  const _setEnqueueAtomAtom = useSetAtom(enqueueAtomAtom);
  const [_queueAtom] = useAtom(queueAtom);
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
          _setEnqueueAtomAtom({
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
          _setDequeueAtomAtom();
        }}
        title="DEQUEUE"
        color="red"
      ></Button>
      {_queueAtom ? (
        _queueAtom.map((item) => {
          return <Text key={item.video.path}>{item.video.path}</Text>;
        })
      ) : (
        <Text>Undefined</Text>
      )}
    </View>
  );

  return userAuth ? subscriptionsScreen : signUpScreen;
}
