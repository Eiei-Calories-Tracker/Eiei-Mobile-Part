import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import FoodRecordHeader from "../components/FoodRecordHeader";
import FoodRecordPanel from "../components/FoodRecordPanel";
import BottomNavBar from "../components/BottomNavBar";

export default function CreateFoodRecordScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 120, // Extra padding for BottomNavBar
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-y-5 p-4">
            <FoodRecordHeader />
            <FoodRecordPanel />
          </View>
        </ScrollView>
        <View className="absolute bottom-0 left-0 right-0 bg-white">
          <BottomNavBar />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
