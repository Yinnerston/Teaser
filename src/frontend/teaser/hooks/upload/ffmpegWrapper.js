import {
  FFmpegKit,
  FFprobeKit,
  FFmpegKitConfig,
  ReturnCode,
} from "ffmpeg-kit-react-native";
import RNFS from "react-native-fs";
import {
  VIDEO_IMAGE_FRAME_WIDTH,
  TIMELINE_IMAGE_FPS,
  VIDEO_DEFAULT_CODEC,
  AUDIO_DEFAULT_CODEC,
} from "../../Constants";
import { Platform } from "react-native";

/**
 * https://medium.com/nollie-studio/creating-a-smooth-and-interactive-video-timeline-with-react-native-and-ffmpeg-8c6624ad90ca
 */
export default class FFmpegWrapper {
  // static normalizeEncoding(
  //   localFileName,
  //   container,
  //   videoURI,
  //   reencodeCallback,
  //   errorCallback,
  // ) {
  //   const isDefault = FFmpegWrapper.ffprobeValidateDefaultMediaInformation(
  //     videoURI,
  //     errorCallback,
  //   );
  //   if (!isDefault) {
  //     const extension = Platform.OS === "android" ? "file://" : "";
  //     let outputVideoPath = `${extension}${RNFS.CachesDirectoryPath}/${localFileName}_reencoded${container}`;
  //     // TODO: Encode with default video parameters
  //     const ffmpegCommand = `-i ${videoURI} -c:v libx265 -vtag hvc1 ${outputVideoPath}`; // TODO: Ultrafast or slower + run in background?

  //     FFmpegKit.executeAsync(ffmpegCommand, async (session) => {
  //       const state = FFmpegKitConfig.sessionStateToString(
  //         await session.getState(),
  //       );
  //       const returnCode = await session.getReturnCode();
  //       const failStackTrace = await session.getFailStackTrace();
  //       const duration = await session.getDuration();

  //       if (ReturnCode.isSuccess(returnCode)) {
  //         console.log(
  //           `Reencoding completed successfully in ${duration} milliseconds;.`,
  //         );
  //         console.log(`Check at ${outputVideoPath}`);
  //         reencodeCallback(outputVideoPath);
  //       } else {
  //         console.log("Reencoding failed. Please check log for the details.");
  //         console.log(
  //           `Encode failed with state ${state} and rc ${returnCode}.${
  //             (failStackTrace, "\\n")
  //           }`,
  //         );
  //       }
  //     });
  //   }
  // }
  // /**
  //  * Validate that the video / audio codecs are h264 / aac.
  //  * @param {*} url
  //  * @returns bool
  //  */
  // static ffprobeValidateDefaultMediaInformation(url, errorCallback) {
  //   return FFprobeKit.getMediaInformation(url, errorCallback).then(
  //     async (session) => {
  //       console.log("FFPROBE");
  //       console.log(session);
  //       // CHECK THE FOLLOWING ATTRIBUTES ON ERROR
  //       // const state = FFmpegKitConfig.sessionStateToString(await session.getState());
  //       const returnCode = await session.getReturnCode();
  //       // const failStackTrace = await session.getFailStackTrace();
  //       // const duration = await session.getDuration();
  //       const output = await session.getOutput();
  //       console.log(output);
  //       var isDefault = true;
  //       if (ReturnCode.isSuccess(returnCode)) {
  //         let videoStream = output.stream[0];
  //         isDefault &=
  //           videoStream["codec_name"] == VIDEO_DEFAULT_CODEC["codec_name"];
  //         isDefault &=
  //           videoStream["time_base"] == VIDEO_DEFAULT_CODEC["time_base"];
  //         isDefault &= videoStream["width"] == VIDEO_DEFAULT_CODEC["width"];
  //         isDefault &= videoStream["height"] == VIDEO_DEFAULT_CODEC["height"];
  //         isDefault &=
  //           videoStream["r_frame_rate"] == VIDEO_DEFAULT_CODEC["r_frame_rate"];
  //         let audioStream = output.stream[1];
  //         isDefault &=
  //           audioStream["codec_name"] == AUDIO_DEFAULT_CODEC["codec_name"];
  //         isDefault &=
  //           audioStream["time_base"] == AUDIO_DEFAULT_CODEC["time_base"];
  //         isDefault &=
  //           audioStream["r_frame_rate"] == AUDIO_DEFAULT_CODEC["r_frame_rate"];
  //       } else {
  //         console.log("Error calling ffprobe on the given url");
  //         errorCallback();
  //       }
  //       return isDefault;
  //     },
  //   );
  // }

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

  /**
   * Concatenate videos assuming same codecs and video stream.
   * @param {*} queueVideos
   */
  static concatQueue(
    concatFileName,
    videoPaths,
    successCallback,
    errorCallback,
  ) {
    if (videoPaths.length == 1) {
      successCallback(videoPaths[0]);
      return;
    }
    //  Create output path
    const extension = Platform.OS === "android" ? "file://" : "";
    let outputVideoPath = `${extension}${RNFS.CachesDirectoryPath}/${concatFileName}_concat.mp4`;

    // Create file from list of video paths
    let pathsListFile = `${extension}${RNFS.CachesDirectoryPath}/${concatFileName}_list.txt`;
    let videoPathsFilePrefix = videoPaths.map((name) => "file '" + name + "'");
    RNFS.writeFile(pathsListFile, videoPathsFilePrefix.join("\n"), "utf8").then(
      (_content) => {
        const ffmpegCommand = `-f concat -y -safe 0 -i ${pathsListFile} -c copy ${outputVideoPath}`;
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
              // success
              console.log(
                `Concat completed successfully in ${duration} milliseconds;.`,
              );
              console.log(`Check at ${outputVideoPath}`);
              successCallback(outputVideoPath);
            } else {
              // failure
              console.log("Concat failed. Please check log for the details.");
              console.log(
                `Concat failed with state ${state} and rc ${returnCode}.${
                  (failStackTrace, "\\n")
                }`,
              );
              console.log(failStackTrace);
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
      },
    );

    // console.log(RNFS.readFile(pathsListFile, 'utf8'))
    // Concatenate videos together
  }
}
