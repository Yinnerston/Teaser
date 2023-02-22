import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";

/**
 * Login Screen.
 * @returns
 */
export default function LoginScreen() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // TODO: Implement Login endpoint
  const onSubmit = (data) => console.log(data);

  return (
    <View style={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue="Username"
          {...register("username", { required: true })}
        ></input>
        {errors.username ? <span>This field is required</span> : null}
        <input
          defaultValue="Password"
          {...register("password", { required: true })}
        ></input>
        {errors.password ? <span>This field is required</span> : null}
        <input type="submit" />
      </form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
