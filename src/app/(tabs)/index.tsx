import { CalendarDaysIcon } from "@/components/ui/icon";
import CircularProgress from "@/src/components/CircularProgress";
import { formatDate, rangeFormatDate } from "@/src/services/dateService";
import { NUTRIENT_API } from "@/src/services/nutritionService";
import { useAuthStore } from "@/src/utils/authStore";
import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CalendarModal } from "../components/CalendarModal";

import { FoodRecordType, NutritionType, WeekNutritionType } from "@/interface";
import { FOODRECORD_API } from "@/src/services/foodrecordService";
import { useFocusEffect } from "expo-router";
import BoxIcon from "../components/BoxIcon";
import FoodIcon from "../components/FoodIcon";
import LeafIcon from "../components/LeafIcon";
import { ListFoodRecord } from "../components/ListFoodRecord";
import { RangeWeekDay } from "../components/RangeWeekDay";

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
  const { userId, accessToken, setUserData, userData } = useAuthStore();
  // console.log("userId", userId, accessToken);
  const [loading, setLoading] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [foodList, setFoodList] = useState<FoodRecordType[]>([]);
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
  const [currentDatePick, setCurrentDatePick] = useState(-1);
  async function getFoodRecordDate(date: Date) {
    if (!userId) return;
    setLoading(true);
    const res = await FOODRECORD_API.fetchTargetDateFoodRecord(
      date,
      userId,
      accessToken!,
    );
    setFoodList(res);
    setLoading(false);
  }
  useEffect(() => {
    if (!userId) return;
    onSubmit(new Date());
  }, [userId]);
  useFocusEffect(
    useCallback(() => {
      onSubmit(new Date());
      // getFoodRecordDate(new Date());
      // alert(1);
    }, [userId, accessToken]),
  );
  useEffect(() => {
    if (weekData.length === 0) return;
    if (!userId) return;
    if (currentDatePick === -1) return;

    const localDate = new Date(weekData[currentDatePick].current_date);
    getFoodRecordDate(localDate);
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
            <Text style={style.bold}>
              Welcome, {userData?.first_name ?? ""}
            </Text>
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
              <Text style={[style.nutrient, { fontSize: 18 }]}>
                {nutrient.carb}
              </Text>
              <Text style={style.nutrient}>/{limitNutrient.carb} gram</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 80,
          backgroundColor: "white",
          width: "80%",
          alignSelf: "center",
          height: 350,
          // minHeight: 200,
          padding: 20,
          borderRadius: 30,
          marginBottom: 100,
          boxShadow: "0 2.5px 10px gray",
          overflow: "hidden",
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
        <ListFoodRecord foodList={foodList} loading={loading} />
        {!loading && foodList.length === 0 && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 200,
            }}
          >
            <Text>No Food Record Today</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
