import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Homepage from './components/pages/Homepage';

import { Video } from 'expo-av';
import HomepageFooter from './components/navs/footer/HomepageFooter';
const tmp = require('./assets/susExample.mp4');

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      {/* <Homepage></Homepage> */}
      <View style={{flex:1}}>
        {/* <Video source={tmp} isLooping={true}></Video> */}
        <Text>Hello World</Text>
      </View>
      <View style={{flex:2, backgroundColor:"black"}}>
        {/* <HomepageFooter></HomepageFooter> */}
        <Text>Bottom text</Text>
      </View>
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
