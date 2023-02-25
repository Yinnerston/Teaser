import { View, TextInput, Text } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { authFormStyles } from "./styles";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";
/**
 * Register Screen for a user's password.
 * @returns
 */
export default function RegisterScreenPassword({ navigation, route }) {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });
  // TODO: Implement Login endpoint
  // On submit, send data to RegisterScreenDOB
  const onSubmit = (data) =>
    navigation.navigate("RegisterDOB", { ...route.params, ...data });

  return (
    <View style={authFormStyles.container}>
      <Text style={authFormStyles.textInputLabel}>Password:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 8,
          maxLength: 32,
          pattern:
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              secureTextEntry={isPasswordSecure}
              style={authFormStyles.textInputStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <Ionicons
              style={{ position: "absolute", right: 24, top: 20 }}
              name={isPasswordSecure ? "eye-off" : "eye"}
              onPress={() => {
                isPasswordSecure
                  ? setIsPasswordSecure(false)
                  : setIsPasswordSecure(true);
              }}
              size={24}
              color="gray"
            />
          </View>
        )}
        name="password"
        // style={{flex: 1}}
      />

      <Text style={authFormStyles.textInputLabel}>Confirm Password:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 8,
          maxLength: 32,
          pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          validate: {
            samePassword: (confirmPassword) => {
              if (watch("password") != confirmPassword)
                return "*Passwords do not match.";
            },
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              secureTextEntry={isConfirmPasswordSecure}
              style={authFormStyles.textInputStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <Ionicons
              style={{ position: "absolute", right: 24, top: 20 }}
              name={isConfirmPasswordSecure ? "eye-off" : "eye"}
              onPress={() => {
                isConfirmPasswordSecure
                  ? setIsConfirmPasswordSecure(false)
                  : setIsConfirmPasswordSecure(true);
              }}
              size={24}
              color="gray"
            />
          </View>
        )}
        name="confirmPassword"
        // style={{flex: 1}}
      />
      <Text style={authFormStyles.formValidationErrorTextNoFlex}>
        {" "}
        {errors.password && "*Password does not meet criteria."}
      </Text>
      <Text style={authFormStyles.formValidationErrorTextNoFlex}>
        {" "}
        {errors.confirmPassword && "*Passwords must match."}
      </Text>

      <AuthButton
        onPress={handleSubmit(onSubmit)}
        color={REGISTER_BUTTON_COLOR}
        routeName="RegisterDOB"
        buttonText="Next"
        navigation={navigation}
      />
      <Text style={authFormStyles.formValidationTextNoFlex}>
        *Passwords must be 8-32 characters long, contain at least one uppercase
        and lowercase letter, number and special character.
      </Text>
    </View>
  );
}
