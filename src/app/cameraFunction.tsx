import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useCameraStore } from "../utils/cameraStore";
import * as ScreenOrientation from "expo-screen-orientation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";

export default function CameraFunction() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [photo, setPhoto] = useState<any>();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const setCapturedImage = useCameraStore((state) => state.setCapturedImage);
  const [permission, requestPermission] = useCameraPermissions();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  let takePic = async () => {
    if (cameraRef.current) {
      let options = {
        quality: 1,
        base64: true,
        exif: false,
      };

      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  if (photo) {
    let savePhoto = async () => {
      setCapturedImage({ uri: photo.uri, base64: photo.base64 });
      setPhoto(undefined);
      router.back();
    };

    return (
      <View className="w-full h-full">
        <Image style={styles.preview} source={{ uri: photo.uri }} />
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={savePhoto}>
            <Ionicons name="save-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setPhoto(undefined)}
          >
            <Ionicons name="trash-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <VStack className="flex flex-1 justify-center items-end w-full right-20">
          <Box className="mb-6 items-center justify-center gap-y-6">
            <TouchableOpacity onPress={toggleCameraFacing}>
              <Ionicons
                className="bg-transparent"
                name="camera-reverse-outline"
                size={30}
                color="white"
              />
            </TouchableOpacity>

            {/* <View style={styles.shutterContainer}> */}

            <TouchableOpacity onPress={takePic}>
              <Ionicons
                name="radio-button-on-outline"
                size={80}
                color="white"
              />
            </TouchableOpacity>
          </Box>
          {/* </View> */}
        </VStack>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 20,
  },
  shutterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  btn: {
    justifyContent: "center",
    margin: 10,
    elevation: 5,
  },
  imageContainer: {
    height: "95%",
    width: "100%",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
    width: "auto",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
