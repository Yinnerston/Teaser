import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Homepage from './components/pages/Homepage';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Homepage></Homepage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
