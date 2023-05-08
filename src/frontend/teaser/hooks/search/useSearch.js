import {
  getSearchResults,
  getSearchSuggestions,
} from "../../api/search/searchApi";

/**
 * Get the key for search suggestions
 * TODO: dynamic search suggestions by searchTerm
 * @param {*} token_hash
 * @param {*} searchTerm
 * @returns
 */
export function getSearchSuggestionsKey(userAuthAtomValue, searchTerm) {
  return userAuthAtomValue === null
    ? ["search", "suggestions", null, searchTerm]
    : ["search", "suggestions", userAuthAtomValue.token_hash, searchTerm];
}

/**
 * Get the key for search query
 * @param {*} token_hash
 * @param {*} searchTerm
 * @returns
 */
export function getSearchQueryKey(userAuthAtomValue, searchTerm) {
  return userAuthAtomValue === null
    ? ["search", "query", null, searchTerm]
    : ["search", "query", userAuthAtomValue.token_hash, searchTerm];
}

/**
 * Get search suggestions each time text changes.
 * TODO: search suggestions implementation in backend
 * @param { queryKey } param0
 * @returns
 */
export function getSearchSuggestionsQueryFn({ queryKey }) {
  const [_searchString, _suggestionsString, token_hash, searchTerm] = queryKey;
  // TODO: optionally add auth from token hash
  return getSearchSuggestions("TODO");
}

/**
 * Get search results on submit.
 * @param { queryKey, pageParam = 1 } param0
 * @returns
 */
export function getSearchResultsQueryFn({ queryKey, pageParam = 1 }) {
  const [__searchString, _queryString, token_hash, searchTerm] = queryKey;
  console.log("SEARCHING", searchTerm);
  // TODO: optionally add auth from token hash
  return getSearchResults(searchTerm, pageParam);
}
