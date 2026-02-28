import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { USER_API } from "../services/userService";
import { useAuthStore } from "../utils/authStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignInScreen() {
  const { logIn, setShouldCreateAccount } = useAuthStore();
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const onSubmit = async (data: any) => {
    try {
      const result = await USER_API.login(data.email, data.password);
      if (result && result.access_token) {
        logIn(result.access_token, result.user_id);
        // Navigation is handled by RootLayout based on isLoggedIn
      } else {
        showErrorToast();
      }
    } catch (error) {
      showErrorToast();
    }
  };

  const showErrorToast = () => {
    toast.show({
      placement: "top",
      render: ({ id }) => (
        <Toast nativeID={id} action="error" variant="solid">
          <VStack space="xs">
            <ToastTitle>Login Failed</ToastTitle>
            <ToastDescription>
              Invalid email or password. Please try again.
            </ToastDescription>
          </VStack>
        </Toast>
      ),
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require("../../assets/images/wave-haikei.png")}
        resizeMode="cover"
        className="absolute top-0 w-full h-[45%]"
      />
      <FormControl
        className="flex-1 px-8"
        isInvalid={!!errors.email || !!errors.password}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View className="mt-[40%] mb-10">
              <Heading className="text-left font-bold text-5xl text-typography-900">
                Sign in
              </Heading>
              <View className="h-1 w-20 bg-[#FF8383] mt-2 rounded-full" />
            </View>

            <VStack space="xl">
              <VStack space="xs">
                <Text className="text-sm font-semibold text-gray-500">
                  Email
                </Text>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    // pattern: {
                    //   value: /\S+@\S+\.\S+/,
                    //   message: "Invalid email format",
                    // },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="underlined"
                      className="border-b-gray-200 focus:border-b-[#FF8383] h-12"
                    >
                      <InputSlot className="pl-0">
                        <InputIcon as={MailIcon} className="text-gray-400" />
                      </InputSlot>
                      <InputField
                        placeholder="demo@email.com"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        className="text-base"
                      />
                    </Input>
                  )}
                />
                {errors.email && (
                  <FormControlError>
                    <FormControlErrorText>
                      {errors.email.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </VStack>

              <VStack space="xs">
                <Text className="text-sm font-semibold text-gray-500">
                  Password
                </Text>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="underlined"
                      className="border-b-gray-200 focus:border-b-[#FF8383] h-12"
                    >
                      <InputSlot className="pl-0">
                        <InputIcon as={LockIcon} className="text-gray-400" />
                      </InputSlot>
                      <InputField
                        type={showPassword ? "text" : "password"}
                        placeholder="enter your password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        className="text-base"
                        secureTextEntry={!showPassword}
                      />
                      <InputSlot className="pr-0" onPress={handleState}>
                        <InputIcon
                          as={showPassword ? EyeIcon : EyeOffIcon}
                          className="text-gray-400"
                        />
                      </InputSlot>
                    </Input>
                  )}
                />
                {errors.password && (
                  <FormControlError>
                    <FormControlErrorText>
                      {errors.password.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </VStack>

              <View className="flex-row justify-between items-center mt-2">
                <Controller
                  control={control}
                  name="rememberMe"
                  render={({ field: { onChange, value } }) => (
                    <Checkbox
                      size="sm"
                      value="rememberMe"
                      isChecked={value}
                      onChange={onChange}
                      aria-label="Remember Me"
                    >
                      <CheckboxIndicator className="border-[#FF8383] data-[checked=true]:bg-[#FF8383] data-[checked=true]:border-[#FF8383]">
                        <CheckboxIcon as={CheckIcon} className="text-white" />
                      </CheckboxIndicator>
                      <CheckboxLabel className="text-xs font-semibold text-gray-700 ml-2">
                        Remember Me
                      </CheckboxLabel>
                    </Checkbox>
                  )}
                />
                <TouchableOpacity>
                  <Text className="text-xs font-semibold text-[#FF8383]">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </VStack>

            <View className="mt-20">
              <Button
                className="w-full bg-[#FF8383] h-14 rounded-2xl active:bg-[#ff6b6b]"
                size="lg"
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
              >
                <ButtonText className="text-white font-bold text-lg">
                  {isSubmitting ? "Logging in..." : "Login"}
                </ButtonText>
              </Button>

              <View className="flex-row justify-center mt-8 pb-10">
                <Text className="text-gray-400 font-medium">
                  Don't have an Account ?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShouldCreateAccount(true);
                    router.push("/create-account");
                  }}
                  activeOpacity={0.7}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text className="text-[#FF8383] font-bold ml-1">Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </FormControl>
    </View>
  );
}
