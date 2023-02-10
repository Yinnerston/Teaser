import { ScrollView } from "react-native";
import HomepageFooter from "../navs/footer/HomepageFooter";
import TeaserView from "../teaser/TeaserView";

export default function ForYouPage()    {
    return (
        <ScrollView>
            <View style={{flex:1}}>
                <TeaserView>
                </TeaserView>
            </View>
            <View style={{flex:2}}>
                <HomepageFooter></HomepageFooter>
            </View>
        </ScrollView>
    );
}
