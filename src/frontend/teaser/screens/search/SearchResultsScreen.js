import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useInfiniteQuery } from "react-query";
import { readOnlyUserAuthAtom } from "../../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import {
  getSearchQueryKey,
  getSearchResultsQueryFn,
} from "../../hooks/search/useSearch";
import { FlatList } from "react-native-gesture-handler";
import SearchResultCard from "../../components/cards/SearchResultCard";

export default function SearchResultsScreen({ navigation, route }) {
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  const searchTerm = route.params?.searchTerm;
  const searchResults = useInfiniteQuery({
    queryKey: getSearchQueryKey(userAuthAtomValue, searchTerm),
    queryFn: getSearchResultsQueryFn,
    getNextPageParam: (lastPage, allPages) => {
      const pageParam = lastPage.next
        ? lastPage.next.split("page=").pop().split("&")[0]
        : undefined;
      return pageParam;
    }, // TODO: implement cursor page number in backend
    keepPreviousData: true,
  });

  /**
   * Render search data. See SearchResultSchema
   * @param {*} param0
   * @returns
   */
  const renderSearchResultCard = ({ item }) => (
    <SearchResultCard
      navigation={navigation}
      description={item.description}
      thumbnailURL={item.thumbnail_url}
      videoURL={item.video_url}
      videoMode={item.video_mode}
      profilePhotoUrl={item.profile_photo_url}
      username={item.username}
      viewCount={item.n_likes}
      likeCount={item.n_likes}
    />
  );

  if (searchResults.isLoading)
    return (
      <SafeAreaView>
        <Text>...Loading</Text>
      </SafeAreaView>
    );
  if (searchResults.isError) console.error(searchResults.error);
  return (
    <SafeAreaView>
      <FlatList
        data={searchResults.data.pages.map((page) => page.results).flat()}
        renderItem={renderSearchResultCard}
        keyExtractor={(item) => "SEARCHRESULTSITEM" + item.post_id.toString()}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={6}
        numColumns={2}
      />
    </SafeAreaView>
  );
}
