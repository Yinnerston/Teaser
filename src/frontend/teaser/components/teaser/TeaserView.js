import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import TeaserCaption from "../navs/caption/TeaserCaption";
import TeaserHeader from "../navs/header/TeaserHeader";
import TeaserSidebar from "../navs/sidebar/TeaserSidebar";
import TeaserVideo from "../navs/video/TeaserVideo";

/**
 *  Container for all the components that make up a teaser.
 * @returns 
 */
export default function TeaserView()    {
    // const [post, setPost] = useState(props.post);
    
    return (
        <View style={styles.container}>
          <TeaserHeader></TeaserHeader>
          <TeaserVideo></TeaserVideo>
          <TeaserSidebar></TeaserSidebar>
          <TeaserCaption></TeaserCaption>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  