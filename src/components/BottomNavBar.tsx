import { router, usePathname } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeIcon from "../app/components/HomeIcon";
import UserIcon from "../app/components/UserIcon";

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 90,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F2F2F2",
    paddingBottom: 20,
    paddingTop: 10,
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    fontSize: 10,
    marginTop: 4,
  },
  createButtonPlaceholder: {
    flex: 1,
    alignItems: "center",
  },
  createButton: {
    backgroundColor: "black",
    borderRadius: 40,
    width: 60,
    height: 60,
    position: "absolute",
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <View style={style.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/")}
        style={style.navItem}
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

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/setting")}
        style={style.navItem}
      >
        <UserIcon color={pathname === "/setting" ? "#53B175" : "black"} />
        <Text
          style={[
            style.label,
            { color: pathname === "/setting" ? "#53B175" : "black" },
          ]}
        >
          Setting
        </Text>
      </TouchableOpacity>
    </View>
  );
}
