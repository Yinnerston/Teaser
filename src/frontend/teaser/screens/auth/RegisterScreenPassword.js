import { View } from "react-native";
import { useForm } from "react-hook-form";
import { authFormStyles } from "./styles";
/**
 * Register Screen for a user's password.
 * @returns
 */
export default function RegisterScreenPassword({ navigator }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // TODO: Implement Login endpoint
  // On submit, send data to RegisterScreenDOB
  const onSubmit = (data) => {
    console.log(data);
    navigator.navigate("");
  };

  return (
    <View style={authFormStyles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Password:</label>
        <input
          placeholder="Password"
          {...register("password", {
            required: true,
            minLength: 8,
            maxLength: 32,
            pattern:
              "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$",
          })}
        ></input>
        {errors.password ? <span>*Password meet the guidelines.</span> : null}
        <Text style={authFormStyles.formValidationText}>
          Passwords must be 8-32 characters long, contain at least one uppercase
          and lowercase letter, number and special character
        </Text>
        <input type="submit" />
      </form>
    </View>
  );
}
