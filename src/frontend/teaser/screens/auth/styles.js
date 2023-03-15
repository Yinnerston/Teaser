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
  formValidationErrorTextNoFlex: {
    color: "red",
    fontSize: 12,
    justifyContent: "center",
    textAlign: "center",
  },
  textInputLabel: {
    fontWeight: "bold",
    fontSize: TEXT_INPUT_LABEL_FONTWEIGHT,
  },
  textInputStyle: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginLinkStyle: {
    color: "#fe2c55",
    justifyContent: "center",
    textAlign: "center",
  },
});
