import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from "ffmpeg-kit-react-native";
import RNFS from "react-native-fs";
import { VIDEO_IMAGE_FRAME_WIDTH, TIMELINE_IMAGE_FPS } from "../../Constants";
import { Platform } from "react-native";
/**
 * https://medium.com/nollie-studio/creating-a-smooth-and-interactive-video-timeline-with-react-native-and-ffmpeg-8c6624ad90ca
 */
export default class FFmpegWrapper {
  static getFrames(
    localFileName,
    videoURI,
    frameNumber,
    successCallback,
    errorCallback,
  ) {
    const extension = Platform.OS === "android" ? "file://" : "";
    let outputImagePath = `${extension}${RNFS.CachesDirectoryPath}/${localFileName}_%4d.png`;
    const ffmpegCommand = `-ss 0 -i ${videoURI} -vf "fps=${TIMELINE_IMAGE_FPS}/1:round=up,scale=${VIDEO_IMAGE_FRAME_WIDTH}:-2" -vframes ${frameNumber} ${outputImagePath}`;
    // -r 1 --> Set frame rate of the output to 1
    // TODO: -vf option to generate simple video filter graph
    FFmpegKit.executeAsync(
      ffmpegCommand,
      async (session) => {
        const state = FFmpegKitConfig.sessionStateToString(
          await session.getState(),
        );
        const returnCode = await session.getReturnCode();
        const failStackTrace = await session.getFailStackTrace();
        const duration = await session.getDuration();

        if (ReturnCode.isSuccess(returnCode)) {
          console.log(
            `Encode completed successfully in ${duration} milliseconds;.`,
          );
          console.log(`Check at ${outputImagePath}`);
          successCallback(outputImagePath);
        } else {
          console.log("Encode failed. Please check log for the details.");
          console.log(
            `Encode failed with state ${state} and rc ${returnCode}.${
              (failStackTrace, "\\n")
            }`,
          );
          errorCallback();
        }
      },
      (log) => {
        console.log(log.getMessage());
      },
      (statistics) => {
        console.log(statistics);
      },
    ).then((session) =>
      console.log(
        `Async FFmpeg process started with sessionId ${session.getSessionId()}.`,
      ),
    );
  }
}
