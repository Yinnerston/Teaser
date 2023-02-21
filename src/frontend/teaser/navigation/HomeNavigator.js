import HomeScreen from "../screens/HomeScreen";
import SubscriptionsScreen from "../screens/SubscriptionsScreen";
import UploadTeaserScreen from "../screens/UploadTeaserScreen";
import InboxScreen from "../screens/InboxScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ForYouScreen from "../screens/ForYouScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeIcon from "../components/elements/icon/HomeIcon";
import HeartIcon from "../components/elements/icon/HeartIcon";
import UploadIcon from "../components/elements/icon/UploadIcon";
import SpeechIcon from "../components/elements/icon/SpeechIcon";
import PersonIcon from "../components/elements/icon/PersonIcon";

const Tab = createMaterialBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Home"
        component={ForYouScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color}></HomeIcon>,
        }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{
          tabBarIcon: ({ color }) => <HeartIcon color={color}></HeartIcon>,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadTeaserScreen}
        options={{
          tabBarIcon: ({ color }) => <UploadIcon color={color}></UploadIcon>,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarIcon: ({ color }) => <SpeechIcon color={color}></SpeechIcon>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <PersonIcon color={color}></PersonIcon>,
        }}
      />
    </Tab.Navigator>
  );
}
