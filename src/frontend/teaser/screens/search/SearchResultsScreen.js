import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { useInfiniteQuery } from "react-query";
import { readOnlyUserAuthAtom } from "../../hooks/auth/useUserAuth";
import { useAtom } from "jotai";
import {
  getSearchQueryKey,
  getSearchResults,
} from "../../hooks/search/useSearch";
import { FlatList } from "react-native-gesture-handler";

export default function SearchResultsScreen({ navigation, route }) {
  const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);
  const searchTerm = route.params?.searchTerm;
  const searchResults = useInfiniteQuery({
    queryKey: getSearchQueryKey(userAuthAtomValue, searchTerm),
    queryFn: getSearchResults,
    getNextPageParam: (lastPage, allPages) => {
      const pageParam = lastPage.next
        ? lastPage.next.split("page=").pop().split("&")[0]
        : undefined;
      return pageParam;
    }, // TODO: implement cursor page number in backend
    keepPreviousData: true,
  });

  // TODO: render search cards here

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
        data={searchResults.data}
        renderItem={() => {}}
        keyExtractor={(item) => item.id}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={6}
        numColumns={2}
      />
    </SafeAreaView>
  );
}
