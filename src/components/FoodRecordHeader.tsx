import { Heading } from "@/components/ui/heading";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

export default function FoodRecordHeader() {
  const router = useRouter();
  return (
    <View className="h-[10%] w-full flex-row content-center items-center">
      <TouchableOpacity onPress={() => router.push("/(tabs)")}>
        <Icon
          as={ChevronLeftIcon}
          className="m-2 w-8 h-8 text-black"
          fill="none"
        />
      </TouchableOpacity>
      <View className="items-center mx-auto">
        <Heading className="justify-self-center font-bold text-3xl">
          Add Food Record
        </Heading>
      </View>
    </View>
  );
}
