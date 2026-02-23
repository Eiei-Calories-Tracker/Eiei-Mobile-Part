import { AppText } from "@/src/components/AppText";
import { USER_API } from "@/src/services/userService";
import { Link } from "expo-router";
import { useEffect } from "react";
import { Button, View } from "react-native";

export default function IndexScreen() {
  useEffect(() => {
    const res = USER_API.getUserById("699be4d8b239af2ba5c479de");
    console.log(res);
  }, []);
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
