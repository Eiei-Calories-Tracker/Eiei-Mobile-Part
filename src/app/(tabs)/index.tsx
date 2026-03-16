import { CalendarDaysIcon } from "@/components/ui/icon";
import CircularProgress from "@/src/components/CircularProgress";
import { formatDate, rangeFormatDate } from "@/src/services/dateService";
import { NUTRIENT_API } from "@/src/services/nutritionService";
import { USER_API } from "@/src/services/userService";
import { useAuthStore } from "@/src/utils/authStore";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CalendarModal } from "./components/CalendarModal";

import BoxIcon from "../components/BoxIcon";
import FoodIcon from "../components/FoodIcon";
import LeafIcon from "../components/LeafIcon";
import { RangeWeekDay } from "./components/RangeWeekDay";
type NutritionType = {
  calories: number;
  carb: number;
  fat: number;
  protein: number;
};
export type WeekNutritionType = {
  cummulative_week_nutrients: NutritionType;
  cummulative_current_day_nutrients: NutritionType;
  target_week_nutrients: NutritionType;
  target_current_day_nutrients: NutritionType;
  current_date: string;
  week_number: number;
  day_state: number;
  day: string;
};
const style = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    fontSize: 12.5,
  },
  weak: {
    fontWeight: "semibold",
    fontSize: 12.5,
  },
  failed: {
    color: "#FF4444",
  },
  passed: {
    color: "#53B175",
  },
  current: {
    color: "#EFEB33",
  },
  nutrient: { textAlign: "center", fontSize: 11, fontWeight: "bold" },
});
export default function IndexScreen() {
  useEffect(() => {
    const res = USER_API.getUserById(1);
    console.log(res);
  }, []);
  const { userId, accessToken } = useAuthStore();
  // console.log("userId", userId, accessToken);

  const [showCalendar, setShowCalendar] = useState(false);

  const [weekData, setWeekData] = useState<WeekNutritionType[]>([]);
  const [nutrient, setNutrient] = useState<NutritionType>({
    calories: 0,
    fat: 0,
    carb: 0,
    protein: 0,
  });
  const [limitNutrient, setLimitNutrient] = useState<NutritionType>({
    calories: 0,
    fat: 0,
    carb: 0,
    protein: 0,
  });
  const [currentDatePick, setCurrentDatePick] = useState(4);
  useEffect(() => {
    if (!userId) return;
    onSubmit(new Date());
  }, [userId]);
  useEffect(() => {
    if (weekData.length === 0) return;
    setNutrient(weekData[currentDatePick].cummulative_current_day_nutrients);
    setLimitNutrient(weekData[currentDatePick].target_current_day_nutrients);
  }, [currentDatePick, weekData]);
  async function onSubmit(selectedDate: Date) {
    if (!userId) return;

    const data = await NUTRIENT_API.fetchWeekNutrient(userId, selectedDate);

    const index = data.findIndex(
      (d: any) =>
        new Date(d.current_date).toDateString() === selectedDate.toDateString(),
    );

    setCurrentDatePick(index);

    setWeekData(data);
  }

  const foodItemExample: { foodName: string; image: string | null }[][] = [
    // Sun
    [
      { foodName: "Chicken Rice", image: null },
      { foodName: "Boiled Egg", image: null },
    ],

    // Mon
    [{ foodName: "Pad Thai", image: null }],

    // Tue
    [
      { foodName: "Grilled Salmon", image: null },
      { foodName: "Salad", image: null },
    ],

    // Wed
    [{ foodName: "Burger", image: null }],

    // Thu
    [
      { foodName: "Steak", image: null },
      { foodName: "Mashed Potato", image: null },
    ],

    // Fri
    [{ foodName: "Pizza", image: null }],

    // Sat
    [
      { foodName: "Sushi", image: null },
      { foodName: "Miso Soup", image: null },
    ],
  ];

  return (
    <ScrollView style={{ width: "100%" }}>
      <View style={{ padding: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            gap: 12.5,
          }}
        >
          <View>
            {/* Change Name */}
            <Text style={style.bold}>Welcome, Tienyuop</Text>
            {/* Change Date */}
            <Text style={style.weak}>
              {weekData.length > 0
                ? formatDate(weekData[currentDatePick].current_date)
                : ""}
            </Text>
          </View>
          {weekData.length > 0 ? (
            <View style={{ alignItems: "flex-end" }}>
              <Text style={style.bold}>
                Week {weekData[currentDatePick].week_number}:{" "}
                {rangeFormatDate(weekData[0].current_date)} -{" "}
                {rangeFormatDate(weekData[6].current_date)}
              </Text>
              <Text style={style.bold}>Target</Text>
              <Text style={style.bold}>
                {limitNutrient.calories} calories/day
              </Text>
              <Text style={style.bold}>
                {weekData[currentDatePick].target_week_nutrients.calories}{" "}
                calories/week
              </Text>
            </View>
          ) : (
            ""
          )}
        </View>
        <View style={{ position: "relative" }}>
          <CircularProgress
            value={nutrient?.calories}
            max={limitNutrient.calories}
            size={200}
          >
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={{ fontSize: 30 }}>{nutrient?.calories}</Text>

              <Text style={{ fontWeight: "bold" }}>
                /{limitNutrient.calories} calories
              </Text>
            </View>
          </CircularProgress>
          <View style={{ position: "absolute", top: "78%", left: "15%" }}>
            <CircularProgress
              value={nutrient.protein}
              max={limitNutrient.protein}
              size={75}
            >
              <FoodIcon />
            </CircularProgress>
            <View style={{ alignItems: "center" }}>
              <Text style={[style.nutrient, { fontSize: 18 }]}>
                {nutrient.protein}
              </Text>
              <Text style={style.nutrient}>/{limitNutrient.protein} gram</Text>
            </View>
          </View>
          <View
            style={{
              position: "absolute",
              top: "78%",
              left: "50%",
              transform: [{ translateX: -37.5 }],
            }}
          >
            <CircularProgress
              value={nutrient.fat}
              max={limitNutrient.fat}
              size={75}
            >
              <BoxIcon />
            </CircularProgress>
            <View style={{ alignItems: "center" }}>
              <Text style={[style.nutrient, { fontSize: 18 }]}>
                {nutrient.fat}
              </Text>
              <Text style={style.nutrient}>/{limitNutrient.fat} gram</Text>
            </View>
          </View>
          <View style={{ position: "absolute", top: "78%", right: "15%" }}>
            <CircularProgress
              value={nutrient.carb}
              max={limitNutrient.carb}
              size={75}
            >
              <LeafIcon />
            </CircularProgress>
            <View style={{ alignItems: "center" }}>
              <Text style={[style.nutrient, , { fontSize: 18 }]}>
                {nutrient.carb}
              </Text>
              <Text style={style.nutrient}>/{limitNutrient.carb} gram</Text>
            </View>
          </View>
        </View>

        {/* <View
        style={{
          width: "80%",
          marginInline: "auto",
          height: 200,
          backgroundColor: "white",
        }}
      ></View> */}
      </View>
      <View
        style={{
          marginTop: 80,
          backgroundColor: "white",
          width: "80%",
          alignSelf: "center",
          height: 300,
          padding: 20,
          borderRadius: 30,
          marginBottom: 100,
          boxShadow: "0 2.5px 10px gray",
        }}
      >
        <View style={{ paddingBlock: 10 }}>
          <TouchableOpacity
            style={{ marginLeft: "auto" }}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <CalendarDaysIcon
              width={24}
              height={24}
              stroke="black"
              fill="white"
            />
            <CalendarModal
              onSubmit={onSubmit}
              current_date={
                weekData.length > 0
                  ? weekData[currentDatePick].current_date
                  : ""
              }
              show={showCalendar}
              setShow={setShowCalendar}
            />
          </TouchableOpacity>
        </View>
        <RangeWeekDay
          currentDatePick={currentDatePick}
          weekData={weekData}
          setCurrentDatePick={setCurrentDatePick}
        />
        {/* Needed New Component (Move with State) */}
        <View style={{ marginTop: 10, gap: 10 }}>
          {foodItemExample[currentDatePick].map((item, index) => (
            <View
              key={index}
              style={{
                padding: 15,
                width: "100%",
                backgroundColor: "#753535",
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white" }}>{item.foodName}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
