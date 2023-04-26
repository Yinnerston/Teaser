import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  REGISTER_BUTTON_COLOR,
  TEXT_BUBBLE_CATEGORY_COLOR,
  TEXT_BUBBLE_RELATED_ELEMENT_COLOR,
} from "../../../Constants";

export default function ExpandableListTextBubble({
  category,
  icon,
  related,
  selected,
  addToSelected,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <View key={"EXPANDABLELISTTEXTBUBBLE" + category} style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setIsExpanded((prev) => !prev);
          // Add to list
          addToSelected(category);
        }}
        style={{
          ...styles.categoryElement,
          borderWidth: selected[category] ? 1 : 0,
        }}
      >
        <Text>
          {icon}
          {category}
        </Text>
      </TouchableOpacity>
      {isExpanded
        ? related?.map((item) => (
            <TouchableOpacity
              style={{
                ...styles.relatedListElement,
                borderWidth: selected[item] ? 1 : 0,
              }}
              onPress={() => addToSelected(item)}
              key={"EXPANDABLELISTTEXTBUBBLECHILD" + item}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))
        : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flexDirection: "row", flexWrap: "wrap" },
  categoryElement: {
    margin: 5,
    backgroundColor: TEXT_BUBBLE_CATEGORY_COLOR,
    borderRadius: 15,
    borderColor: REGISTER_BUTTON_COLOR,
    paddingHorizontal: 5,
  },
  relatedListElement: {
    margin: 5,
    backgroundColor: TEXT_BUBBLE_RELATED_ELEMENT_COLOR,
    borderRadius: 15,
    borderColor: REGISTER_BUTTON_COLOR,
    paddingHorizontal: 5,
  },
});
