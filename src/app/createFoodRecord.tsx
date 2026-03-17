import { KeyboardAvoidingView, Platform, View } from "react-native";
import FoodRecordHeader from "./components/FoodRecordHeader";
import FoodRecordPanel from "./components/FoodRecordPanel";

export default function CreateFoodRecordScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="p-4 gap-y-5">
        <FoodRecordHeader />
        <FoodRecordPanel />
      </View>
    </KeyboardAvoidingView>
  );
}
