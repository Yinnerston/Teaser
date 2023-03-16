import { MaterialIcons } from "@expo/vector-icons";

/**
 * Icon for flipping the camera in the editor
 * @param {color, size} props
 * @returns
 */
export default function FlipCameraIcon(props) {
  const { color, size } = props;
  return <MaterialIcons name="flip-camera-android" size={size} color={color} />;
}
