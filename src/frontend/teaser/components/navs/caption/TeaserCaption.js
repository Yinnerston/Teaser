import { StyleSheet, View, Text } from "react-native";

/**
 * Container for the captions and tags of a teaser.
 * @returns 
 */
export default function TeaserCaption() {
    return (
        <View>
            <Text style={styles.captionText}>Example caption text here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    captionText: {
        fontWeight: 'bold'
    }
});