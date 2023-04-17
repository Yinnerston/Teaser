import FFmpegWrapper from "../../hooks/upload/ffmpegWrapper";
import { getSplitFileNameFromPath } from "../../utils/videoQueueUtils";
import RNFS from "react-native-fs";
import axiosAPIClient from "../axiosAPIClient";
import { TEASER_POST_TYPE, NO_SONG_CHOSEN_FOREIGN_KEY } from "../../Constants";

/**
 * TODO: Use all the variables
 * @param {*} authToken
 * @param {*} queue
 * @param {*} editorSound
 * @param {*} description
 * @param {*} postTags
 * @param {*} postVisibility
 * @param {*} hasComments
 * @param {*} hasHDUpload
 * @param {*} postLinks
 */
export function uploadVideo(
  authToken,
  queue,
  editorSound,
  description,
  postTags,
  postVisibility,
  hasComments,
  hasHDUpload,
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
        const response = await axiosAPIClient.post(
          "posts/create",
          {
            description: description,
            is_private: postVisibility,
            song_id: editorSound ? editorSound.id : NO_SONG_CHOSEN_FOREIGN_KEY,
            post_type: TEASER_POST_TYPE,
            post_data: {
              // TODO:
              data: {},
              question: {},
            },
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        );
        // TODO: No secure way to store API keys.. need to put to server
        // Rewrite create_post_service to a put request using FTP
        // merge this and "posts/create" endpoint
        RNFS.uploadFiles({
          toUrl: response.data["upload_url"],
          files: [
            {
              filename: fileName + "." + extension,
              filepath: outputVideoPath,
            },
          ],
          method: "PUT",
          headers: {
            Accept: "application/json",
            AccessKey: "THIS-IS-A-SECRET-DONT-REVEAL-ME",
          },
          begin: (a) => console.log("BEGIN", a),
          progress: (a) => console.log("PROGRESS", a),
        })
          .promise.then((response) => {
            if (response.statusCode == 200) {
              console.log("FILES UPLOADED!"); // response.statusCode, response.headers, response.body
            } else {
              console.log("SERVER ERROR");
            }
          })
          .catch((err) => {
            if (err.description === "cancelled") {
              // cancelled by user
            }
            console.log(err);
          });
      },
      (e) => console.error(e),
    );
  } catch (error) {
    console.error(error);
  }
}
