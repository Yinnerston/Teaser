import { View, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

/**
 * TODO: Implement this.
 * @returns
 */
export default function DOBDatePickerIOS() {
  return (
    <View>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        onChange={onChange}
      />
    </View>
  );
}
