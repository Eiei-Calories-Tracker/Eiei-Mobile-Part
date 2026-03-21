import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Alert, Modal, TouchableOpacity, View } from "react-native";
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

export default function FoodRecordPanel() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { capturedImage, clearCapturedImage } = useCameraStore();
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<UploadImage | null>(null);
  const { accessToken } = useAuthStore();
  const [isUserEditing, setisUserEditing] = useState<boolean>(true);
  const [foodNutrients, setFoodNutrients] = useState<FoodNutrients[]>([]);
  const [isDisabledServing, setIsDisabledServing] = useState(true);
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
  }

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

  useEffect(() => {
    if (capturedImage) {
      setImage(capturedImage.uri);
      const fileName = capturedImage.uri.split("/").pop() || "image.jpg";
      const fileType = fileName.split(".").pop() || "jpg";
      const image = {
        uri: capturedImage.uri,
        name: fileName,
        type: `image/${fileType}`,
      };
      setImageFile(image);
      clearCapturedImage();
      handlePostFoodName(image);
    }
  }, [capturedImage]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const asset = result.assets[0];
      const image = {
        uri: asset.uri,
        name: asset.fileName || asset.uri.split("/").pop() || "image.jpg",
        type: asset.mimeType || `image/${asset.uri.split(".").pop() || "jpg"}`,
      };
      setImageFile(image);
      handlePostFoodName(image);
    }
  };

  return (
    <Box className="w-full p-4 rounded-3xl">
      <VStack className="w-full">
        {/* Image Box with fixed height (e.g., 200px) */}
        <Box className="w-full h-48 rounded-2xl   ">
          <TouchableOpacity
            className="h-full w-full"
            onPress={() => setOpen(true)}
          >
            {image ? (
              <Image
                source={image}
                alt="image"
                size="none"
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("../../assets/images/upload-image.png")}
                alt="image"
                size="none"
                className="h-full w-full"
                resizeMode="contain"
              />
            )}
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
          />
        </Box>
      </VStack>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
          onPress={() => setOpen(false)}
        >
          <View
            style={{
              width: "90%",
              height: 200,
              borderRadius: 40,
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              elevation: 5,
            }}
          >
            <TouchableOpacity
              style={{
                width: 120,
                height: 80,
                borderRadius: 20,
                backgroundColor: "#FF8383",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                setOpen(false);
                router.push("/cameraFunction");
              }}
            >
              <Text className="text-white font-bold">Use Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 120,
                height: 80,
                borderRadius: 20,
                backgroundColor: "#FF8383",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => {
                pickImage();
                setOpen(false);
              }}
            >
              <Text className="text-white font-bold">Use from Gallery</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Box>
  );
}
