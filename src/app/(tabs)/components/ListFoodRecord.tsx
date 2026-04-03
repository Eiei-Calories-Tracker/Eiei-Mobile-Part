import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { FoodRecordType } from "..";
import FoodItem from "./FoodItem";
import { FoodRecordListModal } from "./FoodRecordListModal";
type props = {
  loading: boolean;
  foodList: FoodRecordType[];
};
export const ListFoodRecord = ({ loading, foodList }: props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return !loading ? (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={{ marginTop: 10, gap: 10, flex: 1 }}
    >
      {foodList.slice(0, 2).map((item, index) => (
        <FoodItem key={index} item={item} />
      ))}
      {foodList.length > 0 && (
        <Text
          style={{
            color: "gray",
            textAlign: "center",
            marginTop: "auto",
            // backgroundColor: "red",
          }}
        >
          View all food records
        </Text>
      )}
      <FoodRecordListModal
        foodList={foodList}
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </TouchableOpacity>
  ) : (
    <View
      style={{
        height: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};
