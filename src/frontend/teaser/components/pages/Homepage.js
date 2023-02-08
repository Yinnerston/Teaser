import { ScrollView } from 'react-native';
import ForYouPage from './ForYouPage';
import FollowingPage from './FollowingPage';

/**
 * Homepage containing ForYou and Following pages.
 * @returns 
 */
export default function HomePage()    {
    return (
        <ScrollView>
            <ForYouPage />
            {/* <FollowingPage /> */}
        </ScrollView>
    );
}
