export const HOMESCREEN_FOOTER_HEIGHT = 48;
export const VIDEO_PORTRAIT = 0;
export const VIDEO_LANDSCAPE = 1;
export const VIEWABILITY_CONFIG_THRESHOLD = 90;
export const TEXT_INPUT_LABEL_FONTWEIGHT = 18;
export const REGISTER_BUTTON_COLOR = "#db133e";
export const TEXT_BUBBLE_CATEGORY_COLOR = "#fcdae2";
export const TEXT_BUBBLE_RELATED_ELEMENT_COLOR = "#F8ABBD";
export const SEARCH_BUTTON_TEXT_COLOR = "#f13059";
export const SWITCH_COLOUR = "#0bde9b";
export const HOME_NAV_ICON_SIZE = 24;
export const SIGN_UP_VIEW_ICON_SIZE = 100;

// Styling for home feed
export const SIDEBAR_WIDTH = 48;
export const SIDEBAR_ICON_SIZE = 32;
export const SIDEBAR_MARGIN_BOTTOM = 20;
// Styling for profile page
export const PROFILE_PHOTO_DIAMETER = 36;

// TODO: Change in production assuming no docker?
export const BASE_URL = "https://wocchit.com/api/v1/";

import Constants from "expo-constants";
export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
// Camera screen
export const MIN_QUEUE_DURATION_MS = 3000;
export const MAX_QUEUE_DURATION_MS = 60000;
// Video Editor
export const START_FROM_PREV_VIDEO_END = -1;
export const VIDEO_EDITOR_SIDEBAR_BUTTON_SIZE = 32;
export const CAMERA_SHUTTER_VIEW_ICON_SIZE = 24;
export const TEASER_VIDEO_MAX_LENGTH_MS = 15000; // 15 seconds.
export const TEASER_VIDEO_REFRESH_RATE_MS = 33; // Around 30fps
export const VIDEO_CONTROL_TOOLBAR_ICON_SIZE = 24;
// Video Editing Screen heights
export const VIDEO_CONTROL_TOOLBAR_HEIGHT = 32;
export const VIDEO_TOOLS_FOOTER_NAV_HEIGHT = 48;

export const TIMELINE_IMAGE_FPS = 1;
export const TIMELINE_VIDEO_FPS = 30; // TODO: Can change this later?
export const VIDEO_IMAGE_FRAME_WIDTH = 40;
export const VIDEO_QUEUE_STACK_POP_TRIGGER_RERENDER_UPDATE = -69;

// Default codecs checked by ffmpegWrapper
export const VIDEO_DEFAULT_CODEC = {
  codec_name: "h264", // TODO: h265
  time_base: "1/90000",
  width: 1920,
  height: 1080,
  r_frame_rate: "30/1",
  // TODO:
};
export const AUDIO_DEFAULT_CODEC = {
  codec_name: "aac",
  time_base: "1/48000",
  channels: "2",
  // TODO:
};

export const TEASER_POST_TYPE = 0;
export const QUESTION_POST_TYPE = 1;
export const NO_SONG_CHOSEN_FOREIGN_KEY = -1;

// Pagination
export const PAGINATION_LIMIT = 50;
export const SEARCH_SUGGESTIONS_PAGINATION_LIMIT = 8;
