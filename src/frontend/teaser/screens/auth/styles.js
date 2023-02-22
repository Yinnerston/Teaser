import { StyleSheet } from "react-native";
import { TEXT_INPUT_LABEL_FONTWEIGHT } from "../../Constants";
export const authFormStyles = StyleSheet.create({
  container: {
    display: "flex",
  },
  formValidationText: {
    flex: 1,
    color: "gray",
    fontSize: 12,
    justifyContent: "center",
    textAlign: "center",
  },
  formValidationTextNoFlex: {
    color: "gray",
    fontSize: 12,
    justifyContent: "center",
    textAlign: "center",
  },
  textInputLabel: {
    fontWeight: "bold",
    fontSize: TEXT_INPUT_LABEL_FONTWEIGHT,
  },
});
