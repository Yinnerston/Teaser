import { StyleSheet, ScrollView } from 'react-native';
import ForYouPage from './ForYouPage';
import FollowingPage from './FollowingPage';
import HomepageFooter from '../navs/footer/HomepageFooter';

/**
 * Homepage containing ForYou and Following pages.
 * @returns 
 */
export default function HomePage()    {
    return (
        <ScrollView style={styles.homepageContainer}>
            <ForYouPage style={{flex: 1}} />
            {/* <FollowingPage /> */}
            <HomepageFooter style={{flex: 2}}></HomepageFooter>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    homepageContainer: {
        flexDirection: 'column'
    }
})