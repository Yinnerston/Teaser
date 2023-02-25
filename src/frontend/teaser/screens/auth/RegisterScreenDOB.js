import { View, Text, Image, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { authFormStyles } from "./styles";
import AuthButton from "../../components/elements/button/AuthButton";
import DOBDatePicker from "../../components/elements/datepicker/DOBDatePicker";
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
  const [date, setDate] = useState(new Date(1995, 11, 17));
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      DOB: new Date(1995, 11, 17), // TODO: Remove example date
    },
  });
  // TODO: Allow <18 DOB, just restrict content to SFW
  const onSubmit = (data) =>
    navigation.navigate("RegisterUsername", { ...route.params, ...data });

  return (
    <View style={authFormStyles.container}>
      <View style={styles.birthdayPromptStyle}>
        <Text style={authFormStyles.textInputLabel}>What's your birthday?</Text>
        <Image source={cake} style={styles.cakeStyle}></Image>
      </View>
      {/* TODO: Add SVG graphic */}
      <Text style={authFormStyles.textInputLabel}>
        Selected: {date.toString()}
      </Text>

      <Controller
        control={control}
        rules={
          {
            // TODO: Uncomment this when you implement DOBDatePicker
            // required: true,
            // validate: {
            //   required: (value) => {
            //     if (!value) return "*This field is required.";
            //     const now = new Date();
            //     const eighteenYearsOld = now.setFullYear(
            //       now.getFullYear() - 18,
            //     );
            //     if (date >= eighteenYearsOld) {
            //       return "*You are not over 18.";
            //     }
            //   },
            // }
          }
        }
        render={({ field: { onChange, value } }) => (
          // TODO:
          <DOBDatePicker onChange={onChange} value={value} />
        )}
        name="dob"
        type="date"
        // style={{flex: 1}}
      />
      <Text style={authFormStyles.formValidationErrorTextNoFlex}>
        {" "}
        {errors.dob && "*You are not over 18 years of age."}
      </Text>
      <AuthButton
        onPress={handleSubmit(onSubmit)}
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
