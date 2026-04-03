import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import {
  ActivityIndicator,
  Alert,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useCameraStore } from "@/src/utils/cameraStore";
import { FOODRECORD_API } from "@/src/services/foodrecordService";
import { useAuthStore } from "@/src/utils/authStore";
import { UploadImage } from "@/interface";
import { useForm } from "react-hook-form";
import FoodRecordForm from "./FoodRecordForm";
import { FoodNutrients } from "@/interface";

export default function FoodRecordDetailPanel({
  foodRecordId,
}: {
  foodRecordId: string;
}) {
  const router = useRouter();

  const [image, setImage] = useState<string | null>(null);
  const { accessToken } = useAuthStore();
  const [isUserEditing, setisUserEditing] = useState<boolean>(true);
  const [foodNutrients, setFoodNutrients] = useState<FoodNutrients[]>([]);
  const [isDisabledServing, setIsDisabledServing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [customfood, setCustomFood] = useState<FoodNutrients>({
    food_id: null,
    food_name: "",
    calories: 0,
    protein: 0,
    carb: 0,
    fat: 0,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      food_id: "-1",
      quantity: 1,
      food_name: "",
      eating_time: new Date(),
      nutrients: {
        calories: 0,
        protein: 0,
        carb: 0,
        fat: 0,
      },
    },
  });

  async function handlePostFoodName(imageFile: UploadImage) {
    setIsLoading(true);
    try {
      const res = await FOODRECORD_API.postFoodName(
        { file: imageFile },
        accessToken!,
      );

      setCustomFood({
        food_id: -1,
        food_name: "",
        calories: 0,
        protein: 0,
        carb: 0,
        fat: 0,
      });
      setValue("food_name", res.food_name, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("nutrients.calories", res.nutrients.calories, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("nutrients.protein", res.nutrients.protein, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("nutrients.carb", res.nutrients.carb, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("nutrients.fat", res.nutrients.fat, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("food_id", res.food_id ? res.food_id.toString() : "-1", {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("quantity", 1, {
        shouldDirty: true,
        shouldValidate: true,
      });
      if (res.food_id) {
        setIsDisabledServing(false);
        setisUserEditing(false);
      }
    } catch (err) {
      console.log("Error posting food name:", err);
    } finally {
      setIsLoading(false);
    }
  }

  //   const onSavePress = async (data: any) => {
  //     setIsLoading(true);
  //     try {
  //       const res = await FOODRECORD_API.postFoodRecord(
  //         {
  //           is_user_create: data.food_id == -1 ? "1" : "0",
  //           food_id: data.food_id != -1 ? data.food_id : null,
  //           new_food_name: data.food_name,
  //           new_food_calories: data.nutrients.calories,
  //           new_food_carb: data.nutrients.carb,
  //           new_food_protein: data.nutrients.protein,
  //           new_food_fat: data.nutrients.fat,
  //           quantity: data.quantity,
  //           eating_time: data.eating_time.toISOString(),
  //           image: imageFile,
  //         },
  //         accessToken!,
  //       );

  //       router.push("/(tabs)");
  //     } catch (err) {
  //       console.log("Error saving food record:", err);
  //       Alert.alert("Error", "Failed to save food record. Please try again.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  useEffect(() => {
    const handleFetchFoodNutrients = async () => {
      const res = await FOODRECORD_API.getFoodNutrients(accessToken!);
      setFoodNutrients([
        ...res.all_food_nutrients,
        {
          food_id: -1,
          food_name: "Custom Food",
          calories: 0,
          protein: 0,
          carb: 0,
          fat: 0,
        },
      ]);
    };
    handleFetchFoodNutrients();
  }, []);

  return (
    <Box className="w-full p-4 rounded-3xl">
      <VStack className="w-full">
        {/* Image Box with fixed height (e.g., 200px) */}
        <Box className="w-full h-48 rounded-2xl   ">
          <TouchableOpacity className="h-full w-full">
            <Image
              source={
                image ? image : require("../../assets/images/upload-image.png")
              }
              alt="image"
              size="none"
              className="h-full w-full"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Box>

        {/* Form Container with NO fixed height */}
        <Box className="w-full mt-4">
          <FoodRecordForm
            control={control}
            errors={errors}
            watch={watch}
            isUserEditing={isUserEditing}
            setisUserEditing={setisUserEditing}
            setValue={setValue}
            handleSubmit={handleSubmit}
            foodNutrients={foodNutrients}
            customfood={customfood}
            setCustomFood={setCustomFood}
            isDisabledServing={isDisabledServing}
            setIsDisabledServing={setIsDisabledServing}
            onSavePress={() => {}}
            setError={setError}
          />
        </Box>
      </VStack>

      <Modal transparent={true} visible={isLoading}>
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white p-6 rounded-2xl items-center shadow-lg">
            <ActivityIndicator size="large" color="#FF8383" />
            <Text className="mt-4 font-semibold text-gray-700">
              Processing...
            </Text>
          </View>
        </View>
      </Modal>
    </Box>
  );
}
