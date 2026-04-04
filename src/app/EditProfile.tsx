import { Stack } from "expo-router";
import { View } from "react-native";
import { ProfileContainer } from "./components/ProfileContainer";

export default function EditProfile() {
  return (
    <View>
      <ProfileContainer editState={true} />
    </View>
  );
}
