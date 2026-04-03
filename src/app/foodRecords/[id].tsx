import BottomNavBar from "@/src/components/BottomNavBar";
import FoodRecordDetailPanel from "@/src/components/FoodRecordDetailPanel";
import FoodRecordHeader from "@/src/components/FoodRecordHeader";
import { useLocalSearchParams } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function FoodRecordDetailScreen() {
  const { id: foodRecordId } = useLocalSearchParams<any>();
  console.log(foodRecordId);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1">
        <FoodRecordHeader label="Food Record Detail" />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-y-5 p-4">
            <FoodRecordDetailPanel />
          </View>
        </ScrollView>
        <View className="absolute bottom-0 left-0 right-0 bg-white">
          <BottomNavBar />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
