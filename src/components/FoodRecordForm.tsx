import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useEffect } from "react";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { HStack } from "@/components/ui/hstack";

export default function FoodRecordForm({
  control,
  errors,
  watch,
  handleSubmit,
  isUserEditing,
  setValue,
  setisUserEditing,
}: {
  control: Control<any>;
  errors: FieldErrors<any>;
  watch: any;
  handleSubmit: any;
  isUserEditing: boolean;
  setValue: any;
  setisUserEditing: (isUserEditing: boolean) => void;
}) {
  const onSavePress = (data: any) => {
    console.log("Validated Data:", data);
    setisUserEditing(false);
  };

  const foodName = useWatch({
    control,
    name: "food_name",
  }); //isolate rerender
  const foodCalories = useWatch({
    control,
    name: "nutrients.calories",
  });

  return (
    <Box className="w-full h-full p-2 gap-y-2">
      {/* Food Name Section */}
      {isUserEditing ? (
        <FormControl
          className="flex flex-row h-16 items-center mb-5"
          isInvalid={!!errors.food_name}
        >
          <FormControlLabel className="w-[30%]">
            <FormControlLabelText className="font-semibold">
              Food Name
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="food_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input variant="outline" className="rounded-xl w-[70%]">
                <InputField
                  placeholder="Enter food name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
              </Input>
            )}
          />
        </FormControl>
      ) : (
        <Box className="flex flex-row h-12 items-center mb-5">
          <Text className="w-[30%] font-semibold ">Food Name</Text>
          <Text className="w-[70%]">{foodName}</Text>
        </Box>
      )}

      {/* Quantity Section */}
      {isUserEditing ? (
        <FormControl
          className="flex flex-row h-16 items-center mb-5"
          isInvalid={!!errors.quanity}
        >
          <FormControlLabel className="w-[30%]">
            <FormControlLabelText className="font-semibold">
              Serving
            </FormControlLabelText>
          </FormControlLabel>
          <View className="flex flex-row items-center gap-x-2 w-[70%] justify-end">
            <Controller
              control={control}
              name="quanity"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input variant="outline" className="rounded-xl w-[30%] h-10">
                  <InputField
                    placeholder="1"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                  />
                </Input>
              )}
            />
            <Text className="w-[20%] font-medium">Plate</Text>
          </View>
        </FormControl>
      ) : (
        <Box className="flex flex-row h-16 items-center mb-5">
          <Text className="w-[30%] font-semibold ">Serving</Text>
          <View className="flex flex-row items-center gap-x-2 w-[70%] justify-end h-10">
            <Text className="w-[30%]">{watch("quanity")} </Text>
            <Text className="w-[20%] font-medium"> Plate</Text>
          </View>
        </Box>
      )}

      {/* Calories Section */}
      <HStack className="items-center gap-x-2 rounded-3xl bg-gray-200 w-full p-4 h-24 mb-4">
        <AntDesign name="fire" size={24} color="#FF8383" />
        <VStack className="flex-1 gap-y-2">
          <Text className="font-semibold text-gray-600">Calories</Text>
          {isUserEditing ? (
            <FormControl>
              <View className="flex flex-row items-center gap-x-2">
                <Controller
                  control={control}
                  name="nutrients.calories"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input variant="outline" className="rounded-xl w-[50%] h-9">
                      <InputField
                        placeholder="0"
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value?.toString()}
                      />
                    </Input>
                  )}
                />
                <Text className="w-[20%] font-medium">kcal</Text>
              </View>
            </FormControl>
          ) : (
            <View className="flex flex-row items-center gap-x-2 w-[100%] h-10">
              <Text className="w-[50%]">{foodCalories} </Text>
              <Text className="w-[20%] font-medium"> kcal</Text>
            </View>
          )}
        </VStack>
      </HStack>

      {/* Nutrients Grid (Protein, Carbs, Fat) */}
      <VStack space="md" className="mb-4">
        {/* Protein */}
        <Box className="flex flex-row justify-between items-center h-12 border-b border-gray-100">
          <Text className="font-semibold text-gray-600">Protein</Text>
          {isUserEditing ? (
            <Controller
              control={control}
              name="nutrients.protein"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input variant="outline" className="rounded-lg w-24 h-9">
                  <InputField
                    placeholder="0"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                  />
                </Input>
              )}
            />
          ) : (
            <Text className="font-medium">{watch("nutrients.protein")} g</Text>
          )}
        </Box>

        {/* Carbs */}
        <Box className="flex flex-row justify-between items-center h-12 border-b border-gray-100">
          <Text className="font-semibold text-gray-600">Carbs</Text>
          {isUserEditing ? (
            <Controller
              control={control}
              name="nutrients.carbs"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input variant="outline" className="rounded-lg w-24 h-9">
                  <InputField
                    placeholder="0"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                  />
                </Input>
              )}
            />
          ) : (
            <Text className="font-medium">{watch("nutrients.carbs")} g</Text>
          )}
        </Box>

        {/* Fat */}
        <Box className="flex flex-row justify-between items-center h-12 border-b border-gray-100">
          <Text className="font-semibold text-gray-600">Fat</Text>
          {isUserEditing ? (
            <Controller
              control={control}
              name="nutrients.fat"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input variant="outline" className="rounded-lg w-24 h-9">
                  <InputField
                    placeholder="0"
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                  />
                </Input>
              )}
            />
          ) : (
            <Text className="font-medium">{watch("nutrients.fat")} g</Text>
          )}
        </Box>
      </VStack>

      <Button
        className="w-[90%] mx-auto bg-[#FF8383] h-14 rounded-2xl active:bg-[#ff6b6b] mt-4 mb-2"
        size="lg"
        onPress={
          isUserEditing
            ? handleSubmit(onSavePress)
            : () => setisUserEditing(true)
        }
      >
        <ButtonText className="text-white font-bold">
          {isUserEditing ? "Confirm Save" : "Edit Information"}
        </ButtonText>
      </Button>
    </Box>
  );
}
