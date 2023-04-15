import FFmpegWrapper from "../../hooks/upload/ffmpegWrapper";
import { getFileNameFromPath } from "../../utils/videoQueueUtils";
// State variables?
export function uploadVideo(queue) {
  // Concat the videos together
  try {
    let concatFileName = getFileNameFromPath(queue[0].video.path);
    let videoPaths = queue.map((item) => item.video.path);
    FFmpegWrapper.concatQueue(
      concatFileName,
      videoPaths,
      (outputVideoPath) => {
        // TODO: Upload this concatenated video with state variables
        console.log("OUTPUT VIDEO PATH", outputVideoPath);
        console.log(
          "IS VALID: ",
          FFmpegWrapper.ffprobeValidateDefaultMediaInformation(
            outputVideoPath,
            (e) => console.log(e),
          ),
        );
      },
      (e) => console.error(e),
    );
  } catch (error) {
    console.error(error);
  }
}
