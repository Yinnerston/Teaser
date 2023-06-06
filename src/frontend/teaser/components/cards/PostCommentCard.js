import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import HeartIcon from "../elements/icon/HeartIcon";
import { formatCommentDate, numberFormatter } from "../../utils/formatters";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

export default function PostCommentCard({
  navigation,
  commentID,
  username,
  profilePhotoURL,
  commentText,
  nLikes,
  createdAt,
  updatedAt,
  hasReplies,
  depth,
}) {
  const styles = usePostCommentCardStyles();
  const [commentIsLiked, setCommentIsLiked] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profilePhotoContainer}
        onPress={() =>
          navigation.navigate("ProfileViewFromFeed", {
            username: username,
          })
        }
      >
        <Image style={styles.profilePhoto} source={{ uri: profilePhotoURL }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setCommentIsLiked((cur) => !cur)}>
        <View style={styles.commentBodyContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileViewFromFeed", {
                username: username,
              })
            }
          >
            <Text style={styles.usernameText}>{username}</Text>
          </TouchableOpacity>
          <Text>
            {
              // TODO: Parse commentText for #tags and highlight them + make them searchable
              commentText
            }
          </Text>
          <View style={styles.commentFooterContainer}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.commentFooterText}>
                {formatCommentDate(createdAt)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // TODO: Reply mutation hook
                }}
              >
                <Text style={styles.commentFooterReplyButtonText}>Reply</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.commentFooterContainerTwo}>
              <View
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <HeartIcon
                  color={commentIsLiked ? "red" : "gray"}
                  size={12}
                  outline={!commentIsLiked}
                />
                <Text style={styles.commentFooterText}>
                  {commentIsLiked
                    ? numberFormatter.format(nLikes + 1)
                    : numberFormatter.format(nLikes)}
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.commentFooterReplyButtonText}>Report</Text>
              </TouchableOpacity>
            </View>
          </View>
          {hasReplies ? (
            <TouchableOpacity
              onPress={() => {
                // TODO: Expand comments mutation hook
              }}
            >
              <View style={styles.hasRepliesContainer}>
                <Text>View X replies</Text>
              </View>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const usePostCommentCardStyles = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    profilePhotoContainer: {
      width: 48,
    },
    profilePhoto: {
      height: 40,
      width: 40,
      borderRadius: 20,
    },
    commentBodyContainer: {
      width: width - 48,
    },
    usernameText: {
      fontWeight: "bold",
    },
    commentFooterContainer: {
      flexDirection: "row",
    },
    commentFooterContainerOne: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
    },
    commentFooterContainerTwo: {
      flexDirection: "row",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    commentFooterText: {
      color: "gray",
      fontSize: 12,
    },
    commentFooterReplyButtonText: {
      paddingLeft: 16,
      color: "gray",
      fontSize: 12,
      fontWeight: "bold",
    },
    hasRepliesContainer: {
      paddingVertical: 8,
    },
  });
  return styles;
};
