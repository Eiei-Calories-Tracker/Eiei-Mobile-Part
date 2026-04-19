import { Text, TouchableOpacity, View } from "react-native";

import Svg, { Circle } from "react-native-svg";
import { WeekNutritionType } from "@/interface";

type Props = {
  weekData: WeekNutritionType[];
  setCurrentDatePick: React.Dispatch<React.SetStateAction<number>>;
  currentDatePick: number;
};

export const RangeWeekDay = ({
  weekData,
  setCurrentDatePick,
  currentDatePick,
}: Props) => {
  const size = 30;
  const strokeWidth = 4;
  const colorState = ["#FF4444", "#53B175", "#EFEB33"];

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {weekData.map((state, index) => (
        <View key={state.day} style={{ width: size }}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setCurrentDatePick(index)}
          >
            <Svg width={size} height={size}>
              <Circle
                stroke={colorState[state.day_state]}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={(size - strokeWidth) / 2}
                strokeWidth={strokeWidth}
              />
              {currentDatePick === index ? (
                <Circle
                  stroke="black"
                  fill="black"
                  cx={size / 2}
                  cy={size / 2}
                  r={4}
                  strokeWidth={strokeWidth}
                />
              ) : (
                ""
              )}
            </Svg>
          </TouchableOpacity>

          <Text style={{ textAlign: "center", fontSize: 12 }}>{state.day}</Text>
        </View>
      ))}
    </View>
  );
};
