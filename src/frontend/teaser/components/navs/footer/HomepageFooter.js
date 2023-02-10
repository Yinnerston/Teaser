import { StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { HOMEPAGE_FOOTER_HEIGHT } from "../../../Constants";
/**
 * Container for footer of the homepage.
 * Handles seeking between Home, Subscriptions, Inbox and Profile.
 * @returns 
 */
export default function HomepageFooter() {
    return (
        <View style={styles.container}>
            <AntDesign style={{flex: 1, marginLeft: "auto", marginRight: "auto"}} name="home" size={24} color="black" />
            <AntDesign style={{flex: 1, marginLeft: "auto", marginRight: "auto"}} name="heart" size={24} color="black" />
            <SimpleLineIcons style={{flex: 1, marginLeft: "auto", marginRight: "auto"}} name="speech" size={24} color="black" />
            <Ionicons style={{flex: 1, marginLeft: "auto", marginRight: "auto"}} name="person-outline" size={24} color="black" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        height: HOMEPAGE_FOOTER_HEIGHT
    }
})