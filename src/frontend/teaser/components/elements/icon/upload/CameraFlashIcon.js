import { Entypo } from "@expo/vector-icons";

/**
 * Icon representing a camera flash.
 * Used in video editor.
 * @param {color, size} props
 * @returns
 */
export default function CameraFlashIcon(props) {
  const { color, size } = props;
  return <Entypo name="flash" size={size} color={color} />;
}
