import { View, TextInput, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { authFormStyles } from "./styles";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";
/**
 * Register Screen for a user's username.
 * TODO: Validate username is not already taken.
 * @returns
 */
export default function RegisterScreenUsername({ navigation, route }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      username: "",
    },
  });
  // TODO: Implement Login endpoint
  // On submit, send data to RegisterScreenDOB
  const onSubmit = (data) =>
    navigation.navigate("Register2fa", { ...route.params, ...data });

  return (
    <View style={authFormStyles.container}>
      <Text style={authFormStyles.textInputLabel}>Username:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 6,
          maxLength: 32,
          // Usernames can only have letters, numbers, periods and underscores
          pattern: /^[a-zA-Z0-9_.]+$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={authFormStyles.textInputStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="username"
        // style={{flex: 1}}
      />
      {errors.username && (
        <Text style={authFormStyles.formValidationTextNoFlex}>
          *Usernames must be 6-32 characters long. *You can only use letters,
          numbers, periods and underscores in your username.
        </Text>
      )}

      <AuthButton
        onPress={handleSubmit(onSubmit)}
        color={REGISTER_BUTTON_COLOR}
        routeName="Register2fa"
        buttonText="Next"
        navigation={navigation}
      />
    </View>
  );
}
