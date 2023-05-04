import FFmpegWrapper from "../../hooks/upload/ffmpegWrapper";
import { getSplitFileNameFromPath } from "../../utils/videoQueueUtils";
import axiosAPIClient from "../axiosAPIClient";
import axios from "axios";
import {
  TEASER_POST_TYPE,
  NO_SONG_CHOSEN_FOREIGN_KEY,
  BASE_URL,
} from "../../Constants";
import mime from "mime";
/**
 * TODO: Use all the variables
 * @param {*} authToken
 * @param {*} queue
 * @param {*} editorSound
 * @param {*} description
 * @param {*} postTags
 * @param {*} postCategories
 * @param {*} postVisibility
 * @param {*} hasComments
 * @param {*} postIsNSFW
 * @param {*} postLinks
 */
export function uploadVideo(
  authToken,
  queue,
  editorSound,
  description,
  postTags,
  postCategories,
  postVisibility,
  hasComments,
  postIsNSFW,
  postLinks,
) {
  // Concat the videos together
  try {
    let { fileName, extension } = getSplitFileNameFromPath(queue[0].video.path);
    let videoPaths = queue.map((item) => item.video.path);
    FFmpegWrapper.concatQueue(
      fileName,
      videoPaths,
      async (outputVideoPath) => {
        const formData = new FormData();
        formData.append("file", {
          uri: outputVideoPath,
          name: fileName + "." + extension,
          // type: 'video/' + extension
          type: mime.getType(outputVideoPath),
        });
        formData.append(
          "payload",
          JSON.stringify({
            description: description,
            is_nsfw: postIsNSFW,
            is_private: postVisibility,
            has_comments: hasComments,
            song_id: editorSound ? editorSound.id : NO_SONG_CHOSEN_FOREIGN_KEY,
            post_type: TEASER_POST_TYPE,
            post_data: {
              // TODO:
              data: {
                // tags: postTags,
                categories: postCategories,
                // links: postLinks
              },
              question: {},
            },
          }),
        );
        console.log(formData);
        axios({
          baseURL: BASE_URL,
          url: "posts/create",
          method: "POST",
          data: formData,
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        })
          .then(function (response) {
            console.log("response :", response);
          })
          .catch(function (error) {
            console.log("error from image :", error.toJSON());
          });
      },
      (e) => console.error(e),
    );
  } catch (error) {
    console.error(error);
  }
}
