import SubscriptionsScreen from "../screens/SubscriptionsScreen";
import UploadTeaserScreen from "../screens/UploadTeaserScreen";
import InboxScreen from "../screens/InboxScreen";
import ProfileScreen from "../screens/ProfileScreen";
import TeaserViewList from "../components/teaser/TeaserViewList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeIcon from "../components/elements/icon/HomeIcon";
import HeartIcon from "../components/elements/icon/HeartIcon";
import UploadIcon from "../components/elements/icon/UploadIcon";
import SpeechIcon from "../components/elements/icon/SpeechIcon";
import PersonIcon from "../components/elements/icon/PersonIcon";
import { StyleSheet } from "react-native";
import { HOMESCREEN_FOOTER_HEIGHT } from "../Constants";

const Tab = createBottomTabNavigator();

/**
 * Bottom Tab navigator for Homepage.
 * @returns
 */
export default function HomeNavigator() {
  return (
    <Tab.Navigator
      tabBarShowLabel={false}
      screenOptions={{ headerShown: false, tabBarStyle: styles.barStyle }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={TeaserViewList}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color}></HomeIcon>,
          ...iconParameters,
        }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionsScreen}
        options={{
          tabBarIcon: ({ color }) => <HeartIcon color={color}></HeartIcon>,
          ...iconParameters,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadTeaserScreen}
        options={{
          tabBarIcon: ({ color }) => <UploadIcon color={color}></UploadIcon>,
          ...iconParameters,
        }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          tabBarIcon: ({ color }) => <SpeechIcon color={color}></SpeechIcon>,
          ...iconParameters,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <PersonIcon color={color}></PersonIcon>,
          ...iconParameters,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: "black",
    height: HOMESCREEN_FOOTER_HEIGHT,
    marginVertical: "auto",
    paddingVertical: 0,
  },
  labelStyle: {
    fontSize: 10,
    paddingTop: 0,
    marginTop: 0,
  },
});

const iconParameters = {
  tabBarLabelStyle: styles.labelStyle,
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "#bfbfbf",
};
