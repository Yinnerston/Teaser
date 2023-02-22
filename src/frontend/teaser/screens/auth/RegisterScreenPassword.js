import { View, TextInput, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { authFormStyles } from "./styles";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";
/**
 * Register Screen for a user's password.
 * @returns
 */
export default function RegisterScreenPassword({ navigation, email, phone }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });
  // TODO: Implement Login endpoint
  // On submit, send data to RegisterScreenDOB
  const onSubmit = (data) =>
    navigation.navigate("RegisterDOB", { email: email, phone: phone, ...data });

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
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
        // style={{flex: 1}}
      />
      {errors.email && (
        <Text style={authFormStyles.formValidationTextNoFlex}>
          *Passwords must be 8-32 characters long, contain at least one
          uppercase and lowercase letter, number and special character.
        </Text>
      )}

      <AuthButton
        onPress={handleSubmit(onSubmit)}
        color={REGISTER_BUTTON_COLOR}
        routeName="RegisterDOB"
        buttonText="Next"
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
