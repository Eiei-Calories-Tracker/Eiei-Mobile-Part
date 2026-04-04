import { Stack } from "expo-router";
import { View } from "react-native";
import { ProfileContainer } from "./(tabs)/components/ProfileContainer";

export default function EditProfile() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "transparent" },
          headerTransparent: false,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "600",
          },
        }}
      />

      <View>
        <ProfileContainer editState={true} />
      </View>
    </>
  );
}
