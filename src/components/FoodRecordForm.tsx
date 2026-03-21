import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldErrors, useWatch } from "react-hook-form";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { HStack } from "@/components/ui/hstack";
import FoodIcon from "../app/components/FoodIcon";
import BoxIcon from "../app/components/BoxIcon";
import LeafIcon from "../app/components/LeafIcon";
import { CustomSelect } from "./CustomSelect";
import { FoodNutrients } from "@/interface";

export default function FoodRecordForm({
  control,
  errors,
  watch,
  handleSubmit,
  isUserEditing,
  setValue,
  setisUserEditing,
  foodNutrients,
  customfood,
  setCustomFood,
  isDisabledServing,
  setIsDisabledServing,
  onSavePress,
  setError,
}: {
  control: Control<any>;
  errors: FieldErrors<any>;
  watch: any;
  handleSubmit: any;
  isUserEditing: boolean;
  setValue: any;
  setisUserEditing: (isUserEditing: boolean) => void;
  foodNutrients: FoodNutrients[];
  customfood: FoodNutrients;
  setCustomFood: (customfood: FoodNutrients) => void;
  isDisabledServing: boolean;
  setIsDisabledServing: (isDisabledServing: boolean) => void;
  onSavePress: (data: any) => void;
  setError: any;
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const foodName = useWatch({
    control,
    name: "food_name",
  }); //isolate rerender
  const foodCalories = useWatch({
    control,
    name: "nutrients.calories",
  });
  const foodProtein = useWatch({
    control,
    name: "nutrients.protein",
  });
  const foodFat = useWatch({
    control,
    name: "nutrients.fat",
  });
  const foodCarb = useWatch({
    control,
    name: "nutrients.carb",
  });
  const foodId = useWatch({
    control,
    name: "food_id",
  });
  const quantity = useWatch({
    control,
    name: "quantity",
  });
  const eating_time = useWatch({
    control,
    name: "eating_time",
  });

  const handleEditCustomFood = () => {
    if (!isUserEditing) {
      setValue("quantity", 1, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("food_id", "-1");
      setValue("food_name", customfood.food_name);
      setValue("nutrients.calories", customfood.calories);
      setValue("nutrients.protein", customfood.protein);
      setValue("nutrients.carb", customfood.carb);
      setValue("nutrients.fat", customfood.fat);
      setIsDisabledServing(true);
      setisUserEditing(true);
    } else {
      //finish editing
      if (foodName == "") {
        setError("food_name", {
          type: "required",
          message: "Food name is required",
        });
        return;
      }
      setCustomFood({
        food_id: -1,
        food_name: foodName,
        calories: foodCalories,
        protein: foodProtein,
        carb: foodCarb,
        fat: foodFat,
      });
      setIsDisabledServing(false);
      setisUserEditing(false);
    }
  };

  const handleSelect = (val: string) => {
    setIsDisabledServing(false);
    const selectedFood = foodNutrients.find(
      (f: FoodNutrients) => f.food_id?.toString() === val,
    );

    setisUserEditing(false);
    if (selectedFood) {
      if (val == "-1") {
        setisUserEditing(true);
        setIsDisabledServing(true);
        setValue("food_id", "-1");
        setValue("food_name", "");
        setValue("nutrients.calories", 0);
        setValue("nutrients.protein", 0);
        setValue("nutrients.carb", 0);
        setValue("nutrients.fat", 0);
        setValue("quantity", 1);
      } else {
        setIsDisabledServing(false);
        setValue("food_id", selectedFood.food_id?.toString());
        setValue("food_name", selectedFood.food_name);
        setValue("nutrients.calories", selectedFood.calories);
        setValue("nutrients.protein", selectedFood.protein);
        setValue("nutrients.carb", selectedFood.carb);
        setValue("nutrients.fat", selectedFood.fat);
        setValue("quantity", 1);
      }
    }
  };
  const handleCalculateCalories = () => {
    const allCarbs = foodCarb * 4;
    const allProtein = foodProtein * 4;
    const allFat = foodFat * 9;
    const allCalories = allCarbs + allProtein + allFat;
    setValue("nutrients.calories", allCalories);
  };

  useEffect(() => {
    if (isUserEditing) {
      const timer = setTimeout(() => {
        handleCalculateCalories();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [foodCarb, foodFat, foodProtein]);

  return (
    <Box className="w-full h-full p-2 gap-y-2">
      <View className="w-full h-16 p-2 gap-y-2">
        <CustomSelect
          label="Select food"
          placeholder="Select food recognized"
          options={foodNutrients.map((food: FoodNutrients) => ({
            label: food.food_name,
            value: food.food_id?.toString() || "",
          }))}
          value={foodId ? foodId.toString() : ""}
          onChange={(val) => {
            handleSelect(val);
          }}
        />
      </View>
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
            rules={{ required: true }}
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
      <FormControl
        className="flex flex-row h-16 items-center mb-5"
        isInvalid={!!errors.quantity}
      >
        <FormControlLabel className="w-[30%]">
          <FormControlLabelText className="font-semibold">
            Serving
          </FormControlLabelText>
        </FormControlLabel>
        <View className="flex flex-row items-center gap-x-2 w-[70%] justify-end">
          <Controller
            control={control}
            name="quantity"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                variant="outline"
                className="rounded-xl w-[30%] h-10"
                isDisabled={isDisabledServing}
              >
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

      {/* Calories Section */}
      <HStack className="items-center gap-x-2 rounded-3xl bg-gray-200 w-full p-4 h-24 mb-4">
        <AntDesign name="fire" size={24} color="#FF8383" />
        <VStack className="flex-1 gap-y-2">
          <Text className="font-semibold text-gray-600">Calories</Text>
          {isUserEditing ? (
            <View className="flex flex-row items-center gap-x-2 w-[100%] h-10">
              <Text className="w-[50%]">
                {(foodCalories * quantity).toFixed(1)}{" "}
              </Text>
              <Text className="w-[20%] font-medium"> kcal</Text>
            </View>
          ) : (
            <View className="flex flex-row items-center gap-x-2 w-[100%] h-10">
              <Text className="w-[50%]">
                {(foodCalories * quantity).toFixed(1)}{" "}
              </Text>
              <Text className="w-[20%] font-medium"> kcal</Text>
            </View>
          )}
        </VStack>
      </HStack>
      <HStack className="items-center gap-x-2 rounded-3xl  w-full h-24 mb-4">
        <VStack
          className={`flex p-2 gap-y-2 w-[33%] rounded-3xl ${
            isUserEditing
              ? "bg-transparent border border-[#D1D5DB]"
              : "bg-[#D1D5DB]"
          }`}
        >
          <HStack className="w-[100%] content-center items-center gap-x-2">
            <FoodIcon width={30} height={30} />
            <Text className="font-semibold text-gray-600">Protein</Text>
          </HStack>
          {isUserEditing ? (
            <FormControl>
              <View className="flex flex-row items-center gap-x-2">
                <Controller
                  control={control}
                  name="nutrients.protein"
                  rules={{ required: true, min: 0.001 }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-xl w-[50%] h-10"
                    >
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
                <Text className="w-[50%] font-medium">g.</Text>
              </View>
            </FormControl>
          ) : (
            <View className="flex flex-row items-center gap-x-2 w-[100%] h-10">
              <Text className="w-[50%] text-center">
                {(foodProtein * quantity).toFixed(1)}{" "}
              </Text>
              <Text className="w-[50%] font-medium"> g.</Text>
            </View>
          )}
        </VStack>
        <VStack
          className={`flex p-2 gap-y-2 w-[33%] rounded-3xl ${
            isUserEditing
              ? "bg-transparent border border-[#D1D5DB]"
              : "bg-[#D1D5DB]"
          }`}
        >
          <HStack className="w-[100%] content-center items-center gap-x-2">
            <BoxIcon width={30} height={30} />
            <Text className="font-semibold text-gray-600 text-end">Fat</Text>
          </HStack>
          {isUserEditing ? (
            <FormControl>
              <View className="flex flex-row items-center gap-x-2">
                <Controller
                  control={control}
                  name="nutrients.fat"
                  rules={{ required: true, min: 0.001 }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-xl w-[50%] h-10"
                    >
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
                <Text className="w-[50%] font-medium">g.</Text>
              </View>
            </FormControl>
          ) : (
            <View className="flex flex-row items-center gap-x-2 w-[100%] h-10">
              <Text className="w-[50%] text-center">
                {(foodFat * quantity).toFixed(1)}{" "}
              </Text>
              <Text className="w-[50%] font-medium"> g.</Text>
            </View>
          )}
        </VStack>
        <VStack
          className={`flex p-2 gap-y-2 w-[33%] rounded-3xl ${
            isUserEditing
              ? "bg-transparent border border-[#D1D5DB]  "
              : "bg-[#D1D5DB]"
          }`}
        >
          <HStack className="w-[100%] content-center items-center gap-x-2">
            <LeafIcon width={30} height={30} />
            <Text className="font-semibold text-gray-600">Carbs</Text>
          </HStack>
          {isUserEditing ? (
            <FormControl>
              <View className="flex flex-row items-center gap-x-2">
                <Controller
                  control={control}
                  name="nutrients.carb"
                  rules={{ required: true, min: 0.001 }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-xl w-[50%] h-10"
                    >
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
                <Text className="w-[50%] font-medium">g.</Text>
              </View>
            </FormControl>
          ) : (
            <View className="flex flex-row items-center gap-x-2 w-[100%] h-10">
              <Text className="w-[50%] text-center">
                {(foodCarb * quantity).toFixed(1)}{" "}
              </Text>
              <Text className="w-[50%] font-medium"> g.</Text>
            </View>
          )}
        </VStack>
      </HStack>

      {/* Eating Time */}
      <FormControl
        className="flex flex-row h-16 items-center mb-5"
        isInvalid={!!errors.quantity}
      >
        <FormControlLabel className="w-[30%]">
          <FormControlLabelText className="font-semibold">
            Eating Time
          </FormControlLabelText>
        </FormControlLabel>
        <View className="flex flex-row items-center gap-x-2 w-[70%] justify-end">
          <Controller
            control={control}
            name="eating_time"
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="w-[70%]">
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="border border-background-300 rounded-xl h-12 justify-center px-4"
                >
                  <Text>{value.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={value}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(Platform.OS === "ios");
                      if (selectedDate) onChange(selectedDate);
                    }}
                  />
                )}
              </View>
            )}
          />
        </View>
      </FormControl>

      {foodId == "-1" && (
        <Button
          className="w-[50%] mx-auto bg-transparent border border-[#FBC082] h-14 rounded-2xl active:bg-[#f7b072] mt-4 mb-2"
          size="lg"
          onPress={() => {
            handleEditCustomFood();
          }}
        >
          <ButtonText className="text-[#FBC082] font-bold">
            {isUserEditing ? "Save" : "Edit"}
          </ButtonText>
        </Button>
      )}

      <Button
        className="w-[90%] mx-auto bg-transparent border text-[#68BA86] border-[#68BA86] h-14 rounded-2xl active:bg-[#68BA86] disabled:bg-gray-300 disabled:border-gray-300 mt-4 mb-5 disabled:text-gray-500"
        size="lg"
        onPress={handleSubmit(onSavePress)}
        disabled={foodCalories == 0 || isUserEditing}
      >
        <ButtonText
          className="font-bold text-[#68BA86] disabled:text-gray-500"
          disabled={foodCalories == 0 || isUserEditing}
        >
          Save Food Record
        </ButtonText>
      </Button>
    </Box>
  );
}
