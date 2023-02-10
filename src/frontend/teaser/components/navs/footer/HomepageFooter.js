import { StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 

/**
 * Container for footer of the homepage.
 * Handles seeking between Home, Subscriptions, Inbox and Profile.
 * @returns 
 */
export default function HomepageFooter() {
    return (
        <View style={styles.container}>
            <AntDesign style={{flex: 1}} name="home" size={24} color="black" />
            <AntDesign style={{flex: 2}} name="heart" size={24} color="black" />
            <SimpleLineIcons style={{flex: 3}} name="speech" size={24} color="black" />
            <Ionicons style={{flex: 4}} name="person-outline" size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flexDirection: 'row'
    }
})