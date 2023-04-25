import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import * as interestsJSON from "../../assets/interests.json";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";
import ExpandableListTextBubble from "../../components/elements/text/ExpandableListTextBubble";
import { ScrollView } from "react-native-gesture-handler";
import { useState } from "react";

/**
 * SetInterestsScreen sets the interests of an individual
 * @returns
 */
export default function SetInterestsScreen({ navigation }) {
  const styles = useSetInterestsScreenStyles();
  const [selected, setSelected] = useState({});
  const addToSelected = (item) =>
    setSelected((prev) =>
      prev[item] ? { ...prev, [item]: false } : { ...prev, [item]: true },
    );
  console.log(selected);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.description}>
        What kind of content do you want to see on your feed?
      </Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {Object.keys(interestsJSON).map((item) =>
          item != "default" ? (
            <ExpandableListTextBubble
              category={item}
              icon={interestsJSON[item].icon}
              related={interestsJSON[item].related}
              selected={selected}
              addToSelected={addToSelected}
            />
          ) : null,
        )}
      </ScrollView>
      <View style={styles.paddingView} />
      <AuthButton
        onPress={() => {
          // TODO: Add interests to backend
          navigation.navigate("Home");
        }}
        color={REGISTER_BUTTON_COLOR}
        buttonText="Add Interests"
      />
    </SafeAreaView>
  );
}

const useSetInterestsScreenStyles = () => {
  const { height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    scrollView: {
      height: height - 200,
    },
    scrollViewContent: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    description: {
      marginVertical: 20,
      textAlign: "center",
      color: "gray",
    },
    paddingView: {
      height: 20,
    },
  });
  return styles;
};
