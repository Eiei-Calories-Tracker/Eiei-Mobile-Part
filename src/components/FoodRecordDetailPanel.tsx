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
import { useCallback, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useCameraStore } from "@/src/utils/cameraStore";
import { FOODRECORD_API } from "@/src/services/foodrecordService";
import { useAuthStore } from "@/src/utils/authStore";
import {
  FoodRecordPatchRequest,
  FoodRecordType,
  UploadImage,
} from "@/interface";
import { useForm } from "react-hook-form";
import FoodRecordForm from "./FoodRecordForm";
import { FoodNutrients } from "@/interface";
import { FoodRecordStatus } from "../constants";

export default function FoodRecordDetailPanel({
  foodRecordId,
}: {
  foodRecordId: string;
}) {
  const router = useRouter();

  const { accessToken } = useAuthStore();
  const [myFoodRecord, setMyFoodRecord] = useState<FoodRecordType>();
  const [foodNutrients, setFoodNutrients] = useState<FoodNutrients[]>([]);
  const [isUserEditing, setisUserEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInitMyRecord = useCallback(
    (record?: FoodRecordType, nutrients?: FoodNutrients[]) => {
      const targetRecord = record || myFoodRecord;
      const targetNutrients = nutrients || foodNutrients;

      if (targetRecord && targetNutrients && targetNutrients.length > 0) {
        setValue("food_name", targetRecord?.food_name, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("nutrients.calories", targetNutrients[0].calories, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("nutrients.protein", targetNutrients[0].protein, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("nutrients.carb", targetNutrients[0].carb, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("nutrients.fat", targetNutrients[0].fat, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue(
          "food_id",
          targetNutrients[0].food_id
            ? targetNutrients[0].food_id.toString()
            : "-1",
          {
            shouldDirty: true,
            shouldValidate: true,
          },
        );
        setValue("quantity", targetRecord?.quantity, {
          shouldDirty: true,
          shouldValidate: true,
        });
        setValue("eating_time", new Date(targetRecord?.eating_time), {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    },
    [myFoodRecord, foodNutrients, setValue],
  );

  const onSavePress = async (data: any) => {
    setIsLoading(true);
    try {
      const foodRecordPatchRequest: FoodRecordPatchRequest = {
        quantity: parseFloat(data.quantity),
        eating_time: data.eating_time.toISOString(),
      };
      console.log("Food record patch request:", foodRecordPatchRequest);
      await FOODRECORD_API.patchFoodRecord(
        foodRecordId,
        foodRecordPatchRequest,
        accessToken!,
      );
      router.push("/(tabs)");
    } catch (err) {
      console.log("Error editing food record:", err);
      Alert.alert("Error", "Failed to edit food record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchFoodRecordById = async () => {
    setIsLoading(true);
    try {
      const res = await FOODRECORD_API.getFoodRecordById(
        foodRecordId,
        accessToken!,
      );

      const foodNutrientObj: FoodNutrients = {
        food_id: res.food_nutrient.food_id,
        food_name: res.food_nutrient.food_name,
        calories: res.food_nutrient.calories,
        protein: res.food_nutrient.protein,
        carb: res.food_nutrient.carb,
        fat: res.food_nutrient.fat,
      };
      setFoodNutrients([foodNutrientObj]);
      setMyFoodRecord(res.food_record);

      handleInitMyRecord(res.food_record, [foodNutrientObj]);
    } catch (err) {
      console.log("Error fetching food record:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchFoodRecordById();
  }, []);

  return (
    <Box className="w-full p-4 rounded-3xl">
      <VStack className="w-full">
        {/* Image Box with fixed height (e.g., 200px) */}
        <Box className="w-full h-48 rounded-2xl   ">
          <TouchableOpacity className="h-full w-full">
            <Image
              source={
                myFoodRecord?.image_key
                  ? myFoodRecord?.image_key
                  : require("../../assets/images/upload-image.png")
              }
              alt="image"
              size="none"
              className="h-full w-full"
              resizeMode={myFoodRecord?.image_key ? "cover" : "contain"}
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
            onSavePress={onSavePress}
            setError={setError}
            FoodRecordState={FoodRecordStatus.EDIT}
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
