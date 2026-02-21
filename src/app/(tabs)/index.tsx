import { AppText } from "@/src/components/AppText";
import { Link } from "expo-router";
import { Button, View } from "react-native";

export default function IndexScreen() {
  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Home Screen
      </AppText>
      <Link asChild push href="/modal">
        <Button title="Open modal" />
      </Link>
    </View>
  );
}
