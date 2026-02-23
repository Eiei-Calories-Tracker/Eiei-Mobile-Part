import { FormControl } from "@/components/ui/form-control";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { ImageBackground } from "react-native";
import { useAuthStore } from "../utils/authStore";

export default function SignInScreen() {
  const { logIn } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("");
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleSubmit = () => {
    logIn();
  };
  return (
    <View className="flex-1  ">
      <ImageBackground
        source={require("../../assets/images/wave-haikei.png")}
        resizeMode="cover"
        className="absolute top-0 w-full h-[50%]"
      />
      <FormControl className="flex-1 px-4">
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={80}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          >
            <View className="flex-1 justify-center h-[80%] gap-y-5  ">
              <Heading className="text-left font-bold text-6xl  leading-[72px] my-5">
                Sign in
              </Heading>

              <VStack className="gap-10">
                <VStack space="xs">
                  <Text className="text-md font-medium">Email</Text>
                  <Input
                    variant="underlined"
                    className=" focus:border-b-[#FF8383]"
                  >
                    <InputField type="text" placeholder="Enter Your Email" />
                  </Input>
                </VStack>

                <VStack space="xs">
                  <Text className="text-md font-medium">Password</Text>
                  <Input
                    variant="underlined"
                    className="text-center focus:border-b-[#FF8383] "
                  >
                    <InputField
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Your Password"
                    />
                    <InputSlot className="pr-3" onPress={handleState}>
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                </VStack>
              </VStack>
            </View>

            <View className="flex content-center w-full h-[20%] justify-center">
              <VStack>
                <Button
                  className=" w-[80%] m-auto rounded-lg"
                  size="xl"
                  onPress={handleSubmit}
                >
                  <ButtonText>Login</ButtonText>
                </Button>
              </VStack>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </FormControl>
    </View>
  );
}
