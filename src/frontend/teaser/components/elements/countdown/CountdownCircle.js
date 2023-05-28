import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { useWindowDimensions, StyleSheet } from "react-native";
import {
  COUNTDOWN_CIRCLE_LENGTH,
  COUNTDOWN_CIRCLE_STROKE_WIDTH,
  COUNTDOWN_CIRCLE_STROKE_INNER_WIDTH,
} from "../../../Constants";
import { useEffect } from "react";

/**
 * https://www.youtube.com/watch?v=9n2mQJ7TO6Y
 * @param {duration, functionOnFinish} param0
 * @returns
 */
export default function CountdownCircle({ duration, functionOnFinish }) {
  const progress = useSharedValue(0);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const { width, height, styles } = useCountdownStyles();
  useEffect(() => {
    progress.value = withTiming(1, { duration: duration });
  }, []);
  const animatedProps = useAnimatedProps(() => {
    strokeDashoffset: COUNTDOWN_CIRCLE_LENGTH * progress.value;
  });
  return (
    <Animated.View style={styles.container}>
      <Svg>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={COUNTDOWN_CIRCLE_LENGTH / (2 * Math.PI)}
          stroke={"gray"}
          strokeWidth={COUNTDOWN_CIRCLE_STROKE_WIDTH}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2}
          r={COUNTDOWN_CIRCLE_LENGTH / (2 * Math.PI)}
          stroke={"gray"}
          strokeWidth={COUNTDOWN_CIRCLE_STROKE_INNER_WIDTH}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
        />
      </Svg>
    </Animated.View>
  );
}

const useCountdownStyles = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: { position: "absolute", height: height, width: width },
  });
  return { width, height, styles };
};
