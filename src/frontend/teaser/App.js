import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './components/pages/Homepage';

import { Video } from 'expo-av';
import HomepageFooter from './components/navs/footer/HomepageFooter';
const tmp = require('./assets/susExample.mp4');

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
