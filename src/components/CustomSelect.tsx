import { ChevronDownIcon } from "@/components/ui/icon";
import { useState } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";

export const CustomSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <View className="flex-1">
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className="flex flex-row justify-between border p-3 border-gray-200 rounded-xl"
      >
        <Text className="flex text-typography-900 w-[80%]">
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <View className="flex w-[20%] items-end">
          <ChevronDownIcon className="flex w-5 h-5" />
        </View>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center px-6"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-white w-full rounded-3xl overflow-hidden max-h-[60%]">
            <View className="p-4 border-b border-gray-100 items-center">
              <View className="w-10 h-1 bg-gray-300 rounded-full mb-2" />
              <Text className="font-bold text-lg text-typography-900">
                {label}
              </Text>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item.value);
                    setModalVisible(false);
                  }}
                  className={`p-5 border-b border-gray-50 flex-row items-center ${
                    item.value === value ? "bg-red-50" : ""
                  }`}
                >
                  <Text
                    className={`flex-1 text-base ${
                      item.value === value
                        ? "text-[#FF8383] font-bold"
                        : "text-typography-900"
                    }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className="p-5 items-center"
            >
              <Text className="text-gray-500 font-semibold">Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
