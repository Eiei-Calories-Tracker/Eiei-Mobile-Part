import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Alert, Modal, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useCameraStore } from "../../utils/cameraStore";
import { FOODRECORD_API } from "@/src/services/foodrecordService";
import { useAuthStore } from "@/src/utils/authStore";
import { UploadImage } from "@/interface";

export default function FoodRecordPanel() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { capturedImage, clearCapturedImage } = useCameraStore();
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<UploadImage | null>(null);
  const { accessToken } = useAuthStore();

  async function handlePostFoodName(imageFile: UploadImage) {
    const res = await FOODRECORD_API.postFoodName(
      { file: imageFile },
      accessToken!,
    );
  }

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
  console.log(accessToken);
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
    <HStack
      space="md"
      reversed={false}
      className="bg-slate-400 w-full h-[90%] p-4 "
    >
      <VStack className="w-full h-[40%]">
        <Box className="flex items-center justify-center  p-2 h-[90%]">
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
                source={require("../../../assets/images/upload-image.png")}
                alt="image"
                size="none"
                className="h-full w-full"
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
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
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: "100%",
              height: 200,
              borderRadius: 40,
              backgroundColor: "white",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              boxShadow: "0 2.5px 10px gray",
            }}
          >
            <TouchableOpacity
              style={{
                width: 100,
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
              <Text className="text-center">Use Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
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
              <Text className="text-center">Use from Gallery</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </HStack>
  );
}
