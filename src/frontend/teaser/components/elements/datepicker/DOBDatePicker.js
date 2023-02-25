import { View, Text, StyleSheet } from "react-native";
// import DatePicker from 'react-native-date-picker'

export default function DOBDatePicker() {
  return (
    <View>
      <Text style={styles.todoText}>
        TODO: Migrate to bare Expo. React Native DatePicker and its alternatives
        do not work in Expo Go.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  todoText: {
    backgroundColor: "gray",
    fontWeight: "bold",
  },
});
