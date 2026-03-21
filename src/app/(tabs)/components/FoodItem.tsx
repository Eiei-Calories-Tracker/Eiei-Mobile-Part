import { Image, Text, View } from "react-native";
import { FoodRecordType } from "..";
type props = {
  item: FoodRecordType;
};
export const FoodItem = ({ item }: props) => {
  return (
    <View
      style={{
        padding: 15,
        width: "100%",
        backgroundColor: "#753535",
        borderRadius: 20,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={
            item.image_key
              ? { uri: item.image_key }
              : require("../../../../assets/images/default_food.png")
          }
          style={{ width: 50, height: 50, borderRadius: 10 }}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: "white" }}>{item.food_name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "gray" }}>{item.sum_calories} calories</Text>

            <View
              style={{
                width: 5,
                height: 5,
                backgroundColor: "gray",
                borderRadius: 5,
                marginHorizontal: 6,
              }}
            />

            <Text style={{ color: "gray" }}>{item.quantity} items</Text>
          </View>
          <Text style={{ fontSize: 11 }}>
            Carb {item.sum_carb} g. Protein {item.sum_protein} g. Fat{" "}
            {item.sum_fat} g.
          </Text>
        </View>
      </View>
    </View>
  );
};
