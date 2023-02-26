import { View, Button } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

// DateTimePickerAndroid.open(params: AndroidNativeProps)
// DateTimePickerAndroid.dismiss(mode: AndroidNativeProps['mode'])

/**
 * DOB Date Picker for android
 * @returns
 */
export default function DOBDatePickerAndroid(props) {
  const { date, setDate } = props;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      <Button onPress={showDatepicker} title="Set your date of birth!" />
    </View>
  );
}
