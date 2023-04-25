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
export default function SetInterestsScreen({ route, navigation }) {
  const styles = useSetInterestsScreenStyles();
  const { onPress, isPostDetails } = route.params;
  // Attributes are {key: bool} --> True if selected, false or null if not
  const [selected, setSelected] = useState({});
  const addToSelected = (item) =>
    setSelected((prev) =>
      prev[item] ? { ...prev, [item]: false } : { ...prev, [item]: true },
    );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.description}>
        {isPostDetails
          ? "What categories does your post fall under? Teaser uses categories to classify your post and serve it to users who might enjoy it."
          : "What kind of content do you want to see on your feed?"}
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
          // Filter out false or null values
          var filtered_selected = Object.keys(selected).filter(
            function (attribute) {
              return (
                selected[attribute] !== false || selected[attribute] !== null
              );
            },
          );
          // TODO: Add interests to backend
          onPress(filtered_selected);

          if (isPostDetails) {
            navigation.goBack(); // Go back to post details screen
          } else {
            navigation.navigate("Home");
          }
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
      height: height - 300,
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
