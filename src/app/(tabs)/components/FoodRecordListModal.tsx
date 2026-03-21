import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FoodRecordType } from "..";
import { FoodItem } from "./FoodItem";

type props = {
  visible: boolean;
  onClose: Function;
  foodList: FoodRecordType[];
};
export const FoodRecordListModal = ({ visible, onClose, foodList }: props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
          activeOpacity={1}
          onPress={() => onClose()}
        />

        <View
          style={{
            backgroundColor: "white",
            height: "70%",
            width: "90%",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <ScrollView contentContainerStyle={{ padding: 20, gap: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Food Record
              </Text>

              <TouchableOpacity onPress={() => onClose()}>
                <Text style={{ fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>

            {foodList.map((item, index) => (
              <FoodItem item={item} key={index} />
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
