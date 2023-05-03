import {
  getUserProfile,
  getUserProfileFromUsername,
  getUserProfilePostsFromUsername,
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

export function getUserProfilePostsKey(token_hash, username) {
  return ["users", "posts", token_hash, username];
}

export function getUserProfilePostsData({ queryKey, pageParam = 1 }) {
  const [_usersString, _postsString, token_hash, username] = queryKey;
  if (token_hash !== null && username === undefined) {
    // TODO: Get your own posts
    return {};
  } else if (username !== undefined) {
    // TODO: Get somebody else's posts
    return getUserProfilePostsFromUsername(token_hash, username, pageParam);
  } else {
    // userAuthAtomValue and username are null
    console.error(token_hash, username);
  }
  return {};
}
