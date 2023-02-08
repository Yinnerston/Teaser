import { ScrollView } from "react-native";
import TeaserVideo from "../navs/video/TeaserVideo";

export default function FollowingPage()    {
    return (
        <ScrollView>
            <TeaserView>
                <TeaserVideo></TeaserVideo>
            </TeaserView>
        </ScrollView>
    );
}
