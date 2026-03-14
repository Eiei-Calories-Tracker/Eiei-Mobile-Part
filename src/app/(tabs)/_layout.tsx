import { Tabs } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
});

export default function TabsLayout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            maxHeight: 90,
          },
        }}
      >
        <Tabs.Screen name="index" />

        <Tabs.Screen
          name="create"
          options={{
            tabBarButton: () => (
              <View style={{ alignItems: "center", flex: 1 }}>
                <TouchableOpacity
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

        <Tabs.Screen name="setting" />
      </Tabs>

      <Modal visible={open} transparent animationType="slide">
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "red",
          }}
          onPress={() => setOpen(false)}
        >
          <View
            style={{
              width: "100%",
              height: 200,
              borderRadius: 40,
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
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
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
