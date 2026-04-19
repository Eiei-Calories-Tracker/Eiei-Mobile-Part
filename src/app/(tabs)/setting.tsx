import { ArrowRightIcon } from "@/components/ui/icon";
import { Button } from "@/src/components/Button";
import { useAuthStore } from "@/src/utils/authStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import UserIcon from "../components/UserIcon";

export default function SettingsScreen() {
  const { logOut } = useAuthStore();
  const [editState, setEditState] = useState<boolean>(false);
  const router = useRouter();
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingHorizontal: 10,
        paddingTop: 30,
        gap: 20,
        marginInline: 20,
        paddingBottom: 100,
      }}
    >
      <Text style={{ fontSize: 18.5, fontWeight: 500, textAlign: "center" }}>
        Profile Setting
      </Text>
      {/* <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 17 }}>Profile</Text>
        <ProfileContainer editState={editState} />
      </View> */}
      <View
        style={{
          height: 300,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 18,
          gap: 10,
        }}
      >
        <Text style={{ opacity: 0.3, fontWeight: 500, fontSize: 18 }}>
          General
        </Text>
        <TouchableOpacity onPress={() => router.push("/editProfile")}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 7.5,
              }}
            >
              <UserIcon />
              <View>
                <Text style={{ fontSize: 12 }}>Edit Profile</Text>
                <Text style={{ fontSize: 10, color: "gray" }}>
                  Change Profile Data
                </Text>
              </View>
            </View>
            <ArrowRightIcon width={20} height={20} stroke="gray" fill="none" />
          </View>
        </TouchableOpacity>
      </View>
      <Button
        title="Sign out"
        style={{ backgroundColor: "red", borderColor: "red" }}
        onPress={logOut}
      />
    </ScrollView>
  );
}
