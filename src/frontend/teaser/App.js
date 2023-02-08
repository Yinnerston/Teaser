import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Homepage } from 'components/pages/Homepage';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Homepage></Homepage> 
      <Text>Hello from the other side!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
