import { ScrollView } from 'react-native';
import TeaserView from '../teaser/TeaserView';

export default function HomePage()    {
    return (
        <ScrollView>
            <TeaserView></TeaserView>
            <TeaserView></TeaserView>
        </ScrollView>
    );
}
