import { Ionicons } from "@expo/vector-icons";

/**
 * Icon for setting a countdown to recording in the editor
 * @param {color, size} props
 * @returns
 */
export default function RecordingCountdownIcon(props) {
  const { color, size } = props;
  return <Ionicons name="ios-timer" size={size} color={color} />;
}
