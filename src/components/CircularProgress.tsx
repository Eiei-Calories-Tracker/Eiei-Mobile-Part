import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  children: React.ReactNode;
};

export default function CircularProgress({
  value,
  max,
  children,
  size = 120,
  strokeWidth = 15,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(value / max, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size} height={size}>
        {/* Background stroke */}
        <Circle
          stroke="#ddd"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* White center */}
        <Circle
          fill="white"
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth / 2}
        />

        {/* Progress */}
        <Circle
          stroke="#FF8383"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View
        style={{
          position: "absolute",
        }}
      >
        {children}
      </View>
    </View>
  );
}
