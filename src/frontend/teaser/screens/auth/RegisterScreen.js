import { View, TextInput, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useRef } from "react";
import { authFormStyles } from "./styles";
import PhoneInput from "react-native-phone-number-input";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";

/**
 * Register Screen.
 * @returns
 */
export default function RegisterScreen({ navigation }) {
  const phoneInput = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      phone: "",
    },
  });
  // TODO: Implement Login endpoint
  // TODO: Pass props to next navigation.navigate("RegisterPassword", data)
  const onSubmit = (data) => navigation.navigate("Register2fa", data);
  // TODO: Grey out button until fields are valid
  // const [buttonColor, setButtonColor] = useState("#e9e7e9")
  // const [phoneNumberValue, setPhoneNumberValue] = useState("")
  // useEffect(() => {
  // }, [errors.phone, phoneInput.current
  // ])

  return (
    <View style={authFormStyles.container}>
      <Text style={authFormStyles.textInputLabel}>Phone Number:</Text>
      {/* TODO: Check phone number validity with 2fa */}
      <Controller
        control={control}
        rules={{
          required: true,
          validate: (value) => {
            if (phoneInput.current)
              return phoneInput.current.isValidNumber(value);
            else return false;
          },
        }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            ref={phoneInput}
            value={value}
            defaultCode="AU"
            layout="first"
            // onChangeText={(text) => {
            //   setValue(text);
            // }}
            onChangeFormattedText={onChange}
            withDarkTheme
            withShadow
            autoFocus
          />
        )}
        name="phone"
        // style={{flex: 1}}
      />
      <Text style={authFormStyles.formValidationErrorTextNoFlex}>
        {" "}
        {errors.phone && "*A valid phone number is required."}
      </Text>

      {/* <Text style={authFormStyles.textInputLabel}>Email:</Text>
      <Controller
        control={control}
        rules={{
          required: false,
          // TODO: Check through verification email
          pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={authFormStyles.textInputStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
        // style={{flex: 1}}
      />
      <Text style={authFormStyles.formValidationErrorTextNoFlex}>
        {" "}
        {errors.email && "*An email must be in a valid format"}
      </Text>
 */}
      <Text style={authFormStyles.formValidationTextNoFlex}>
        *A phone number is required for 2FA, contact tracing and account
        recovery so that Teaser is a safe space for creators.
      </Text>
      <AuthButton
        onPress={handleSubmit(onSubmit)}
        color={REGISTER_BUTTON_COLOR}
        routeName="Register2fa"
        buttonText="Send Code"
        navigation={navigation}
      />
    </View>
  );
}
