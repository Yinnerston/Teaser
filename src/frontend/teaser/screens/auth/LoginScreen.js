import {
  View,
  Text,
  TextInput,
  StyleSheet,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { Link } from "@react-navigation/native";
import { authFormStyles } from "./styles";
import { useHeaderHeight } from "@react-navigation/elements";
import AuthButton from "../../components/elements/button/AuthButton";
import { REGISTER_BUTTON_COLOR } from "../../Constants";
// import { loginUserFunction } from "../../api/auth/authApi";
import { useSetAtom } from "jotai";
import {
  writeOnlyUserAuthAtom,
  setUserAuthStore,
} from "../../hooks/auth/useUserAuth";
import { loginUserFunction } from "../../api/auth/authApi";
/**
 * Login Screen with username and password fields
 * TODO: Add link to TOS.
 * @returns
 */
export default function LoginScreen({ navigation }) {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const setWriteUserAuth = useSetAtom(writeOnlyUserAuthAtom);
  const styles = useLoginScreenStyle();
  // TODO: set error if login fails
  const [isError, setIsError] = useState(false);
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
  const onSubmit = async (data) => {
    const loginResponse = await loginUserFunction({ ...data });
    console.log(loginResponse);
    if (loginResponse.status == 200) {
      setWriteUserAuth(loginResponse.data);
      setUserAuthStore(JSON.stringify(loginResponse.data));
      navigation.navigate("Home");
    } else {
      setIsError(loginResponse.data.toString());
    }
  };

  return (
    <SafeAreaView style={{ flex: 6 }}>
      <View style={{ flex: 5 }}>
        <Text style={authFormStyles.textInputLabel}>Username:</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 6,
            maxLength: 32,
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
        <AuthButton
          onPress={handleSubmit(onSubmit)}
          color={REGISTER_BUTTON_COLOR}
          routeName="Home"
          buttonText="Login"
          navigation={navigation}
        />
        <Text style={authFormStyles.formValidationErrorTextNoFlex}>
          {"\n"}
          {errors.password || errors.username
            ? "*Login credentials are incorrect!"
            : null}
          {"\n"}
          {!!isError ? isError : null}
        </Text>
      </View>
      <View style={styles.loginView}>
        <Text style={styles.loginViewTextStyle}>
          Forgot your password?{"  "}
          <Link
            to={{ screen: "ForgotPassword" }}
            style={authFormStyles.loginLinkStyle}
          >
            Click Here.
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const useLoginScreenStyle = () => {
  const { height, width } = useWindowDimensions();
  const headerHeight = useHeaderHeight();

  const styles = StyleSheet.create({
    container: {
      justifyContent: "flex-start",
      alignItems: "center",
      height: height,
      width: width,
    },
    logoImageStyle: {
      marginVertical: height / 8,
    },
    titleStyle: {
      flex: 1,
      fontWeight: "bold",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontSize: 24,
    },
    loginView: {
      flex: 1,
      backgroundColor: "#fcdae2",
      // height: 69,
      width: width,
      // position: 'absolute',
      // top: height - 69 - headerHeight,
      marginTop: 69,
    },
    loginViewTextStyle: {
      margin: "auto",
      textAlign: "center",
      justifyContent: "flex-start",
    },
  });
  return styles;
};
