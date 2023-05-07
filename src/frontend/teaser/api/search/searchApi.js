import axiosAPIClient from "../axiosAPIClient";
import { PAGINATION_LIMIT } from "../../Constants";

export async function getSearchResults(query_str, pageParam) {
  const response = await axiosAPIClient.get(
    `search/query/${query_str}?page=${pageParam}&page_size=${PAGINATION_LIMIT}`,
    {},
  );
  return response.data;
}
