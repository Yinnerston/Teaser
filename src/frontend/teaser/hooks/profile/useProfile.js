import {
  getUserProfile,
  getUserProfileFromUsername,
  getUserProfilePostsFromUsername,
  getOwnUserProfilePosts,
} from "../../api/profile/userProfileApi";

export function getUserProfileKey(token_hash, username) {
  return ["users", "profile", token_hash, username];
}

export function getUserProfileData({ queryKey }) {
  const [_usersString, _profileString, token_hash, username] = queryKey;
  if (token_hash !== null && username === undefined) {
    // Get own user auth query
    return getUserProfile(token_hash);
  } else if (username !== undefined) {
    // Get somebody else's profile
    return getUserProfileFromUsername(username);
  } else {
    // userAuthAtomValue and username are null
    console.error(token_hash, username);
  }
  return {};
}

/**
 * Get queryKey for user's posts on their profile.
 * @param {*} token_hash
 * @param {*} username
 * @returns
 */
export function getUserProfilePostsKey(token_hash, username) {
  return ["users", "posts", token_hash, username];
}

/**
 * Gets profile data by username if username is specified.
 * If username is not specified and the user is logged in --> This means you get your own profile.
 * Otherwise invalid query
 * @param { queryKey, pageParam } param0
 * @returns
 */
export function getUserProfilePostsData({ queryKey, pageParam = 1 }) {
  const [_usersString, _postsString, token_hash, username] = queryKey;
  if (token_hash !== null && username === undefined) {
    // Get your own posts using your token_hash
    return getOwnUserProfilePosts(token_hash, pageParam);
  } else if (username !== undefined) {
    // Get somebody else's posts (token_hash not required)
    return getUserProfilePostsFromUsername(token_hash, username, pageParam);
  } else {
    // userAuthAtomValue and username are null
    console.error(token_hash, username);
  }
  return {};
}
