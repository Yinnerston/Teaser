import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { authFormStyles } from "./styles";
import AuthButton from "../../components/elements/button/AuthButton";
import DOBDatePickerAndroid from "../../components/elements/datepicker/DOBDatePickerAndroid";
import DOBDatePickerIOS from "../../components/elements/datepicker/DOBDatePickerIOS";
import {
  REGISTER_BUTTON_COLOR,
  TEXT_INPUT_LABEL_FONTWEIGHT,
} from "../../Constants";
const cake = require("../../assets/cake.png");

/**
 * Register Screen for a user's date of birth.
 * @returns
 */
export default function RegisterScreenDOB({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState(false);

  const renderDatePicker = () => {
    if (Platform.OS === "ios") {
      return (
        <DOBDatePickerIOS
          onChange={setDate}
          date={new Date()}
          display="spinner"
        />
      );
    } else {
      return <DOBDatePickerAndroid date={date} setDate={setDate} />;
    }
  };
  // TODO: Allow <18 DOB, just restrict content to SFW
  const onSubmit = (data) => {
    const now = new Date();
    const eighteenYearsOld = now.setFullYear(now.getFullYear() - 18);
    if (date >= eighteenYearsOld) {
      setError(true);
      return;
    }
    navigation.navigate("RegisterUsername", {
      ...route.params,
      date: date.toDateString(),
    });
  };

  return (
    <View style={authFormStyles.container}>
      <View style={styles.birthdayPromptStyle}>
        <Text style={authFormStyles.textInputLabel}>What's your birthday?</Text>
        <Image source={cake} style={styles.cakeStyle}></Image>
      </View>
      <Text style={authFormStyles.textInputLabel}>
        Selected: {date.toString()}
      </Text>
      {renderDatePicker()}
      <Text style={authFormStyles.formValidationErrorTextNoFlex}>
        {" "}
        {error ? "*You must wait until you 18 to use Teaser." : null}
      </Text>
      <AuthButton
        onPress={onSubmit}
        color={REGISTER_BUTTON_COLOR}
        routeName="RegisterUsername"
        buttonText="Next"
        navigation={navigation}
      />
      <Text style={authFormStyles.formValidationTextNoFlex}>
        *You must be over 18 to use Teaser.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  birthdayPromptStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  cakeStyle: {
    flex: 1,
    maxHeight: 200,
  },
  textInputLabel: {
    fontWeight: "bold",
    fontSize: TEXT_INPUT_LABEL_FONTWEIGHT,
    flex: 1,
  },
});
