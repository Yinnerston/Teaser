import { VIDEO_IMAGE_FRAME_WIDTH } from "../Constants";
export function msToWidth(ms)  {
    return ms * VIDEO_IMAGE_FRAME_WIDTH / 1000;
}
  
export function ReversemsToWidth(width)  {
    return width * 1000 / VIDEO_IMAGE_FRAME_WIDTH;
}
  