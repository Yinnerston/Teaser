import { View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { authFormStyles } from "./styles";
/**
 * Register Screen for a user's date of birth.
 * @returns
 */
export default function RegisterScreenDOB({ navigation }) {
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
    navigation.navigate("");
  };

  return (
    <View style={authFormStyles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Date of Birth:</label>
        <input
          {...register("startDate", {
            validate: {
              required: (value) => {
                if (!value) return "*This field is required.";
                const now = new Date();
                const eighteenYearsOld = now.setFullYear(
                  now.getFullYear() - 18,
                );
                const selectedDate = new Date(value);
                if (selectedDate >= eighteenYearsOld) {
                  return "*You are not over 18.";
                }
              },
            },
          })}
          type="date"
          // className="form-control mt-1"
          placeholder="Date of Birth"
        />
        <Text style={authFormStyles.formValidationText}>
          You must be over 18 to use Teaser.
        </Text>
      </form>
    </View>
  );
}
