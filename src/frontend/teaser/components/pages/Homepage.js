import { ScrollView } from 'react-native';
import { TeaserView } from 'components/teaser/TeaserView';

export default function HomePage()    {
    return (
        <ScrollView style={styles.container}>
            <TeaserView></TeaserView>
            <TeaserView></TeaserView>
        </ScrollView>
    );
}
