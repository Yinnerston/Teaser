import { View } from "react-native";
import { useForm } from "react-hook-form";
import { authFormStyles } from "./styles";
/**
 * Register Screen for a user's date of birth.
 * @returns
 */
export default function RegisterScreenDOB({ navigator }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // TODO: Implement Login endpoint
  // On submit, send data to RegisterScreenUsername
  const onSubmit = (data) => {
    console.log(data);
    navigator.navigate("");
  };

  return (
    <View style={authFormStyles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Date of Birth:</label>
        <input
          placeholder="Username"
          {...register("username", {
            required: true,
            minLength: 6,
            maxLength: 30,
            pattern: "^(?=[a-zA-Z0-9._]{6,30}$)(?!.*[_.]{2})[^_.].*[^_.]$",
          })}
        ></input>
        {errors.username && <span>*Username must meet the guidelines.</span>}
        <Text style={authFormStyles.formValidationText}>
          Username must be between 6-30 characters.
        </Text>
        <input type="submit" />
      </form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
