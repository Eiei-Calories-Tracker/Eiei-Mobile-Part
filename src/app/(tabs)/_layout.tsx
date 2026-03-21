import { router, Tabs, usePathname } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeIcon from "../components/HomeIcon";
import UserIcon from "../components/UserIcon";

const style = StyleSheet.create({
  CreateButton: {
    backgroundColor: "black",
    borderRadius: "100%",
    width: 80,
    height: 80,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-70%" }],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 8,
  },
});

export default function TabsLayout() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            maxHeight: 90,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => router.push("/")}
                style={{ alignItems: "center", flex: 1, marginTop: 10 }}
              >
                <HomeIcon color={pathname === "/" ? "#53B175" : "black"} />
                <Text
                  style={[
                    style.label,
                    { color: pathname === "/" ? "#53B175" : "black" },
                  ]}
                >
                  Home
                </Text>
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            tabBarButton: () => (
              <View style={{ alignItems: "center", flex: 1 }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setOpen(true)}
                  style={style.CreateButton}
                >
                  <Text style={{ color: "white", fontSize: 40 }}>+</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 10,
                    color: "black",
                    marginTop: 25,
                    fontWeight: "bold",
                  }}
                >
                  Add Food Record
                </Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="setting"
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => router.push("/setting")}
                style={{ alignItems: "center", flex: 1, marginTop: 10 }}
              >
                <UserIcon
                  color={pathname === "/setting" ? "#53B175" : "black"}
                />
                <Text
                  style={[
                    style.label,
                    { color: pathname === "/setting" ? "#53B175" : "black" },
                  ]}
                >
                  Setting
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          onPress={() => setOpen(false)}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: 200,
              borderRadius: 40,
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              boxShadow: "0 2.5px 10px gray",
            }}
          >
            <TouchableOpacity
              style={{
                width: 100,
                height: 80,
                borderRadius: 20,
                backgroundColor: "#FF8383",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Scan Food</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                height: 80,
                borderRadius: 20,
                backgroundColor: "#FF8383",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Custom</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
