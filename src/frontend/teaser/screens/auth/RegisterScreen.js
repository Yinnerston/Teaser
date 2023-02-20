import { View } from "react-native";
import { useForm } from "react-hook-form";
import { authFormStyles } from "./styles";

/**
 * Register Screen.
 * @returns
 */
export default function RegisterScreen() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // TODO: Implement Login endpoint
  const onSubmit = (data) => console.log(data);

  return (
    <View style={authFormStyles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* TODO: Validate email */}
        <input
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
          })}
        ></input>
        {errors.email && <span>*A valid email is required</span>}
        <Text style={authFormStyles.formValidationText}>
          By continuing, you agree to Teaser's Terms of Service.
        </Text>
        <input type="submit" />
      </form>
    </View>
  );
}
