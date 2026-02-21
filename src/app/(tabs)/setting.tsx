import { AppText } from "@/src/components/AppText";
import { Button } from "@/src/components/Button";
import { useAuthStore } from "@/src/utils/authStore";
import { View } from "react-native";

export default function SettingsScreen() {
  const { logOut } = useAuthStore();

  return (
    <View className="justify-center flex-1 p-4">
      <AppText center size="heading">
        Settings Screen
      </AppText>
      <Button title="Sign out" onPress={logOut} />
    </View>
  );
}
