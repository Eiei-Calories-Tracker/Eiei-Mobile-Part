import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import {
  CheckIcon,
  ChevronDownIcon,
  CircleIcon,
  EyeIcon,
  EyeOffIcon,
} from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { USER_API } from "../services/userService";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ActivityFactor, Gender, Target } from "../constants";
import { useAuthStore } from "../utils/authStore";

export default function CreateAccountScreen() {
  const router = useRouter();
  const toast = useToast();
  const { setShouldCreateAccount } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: "",
      gender: Gender.MAN,
      activity_factor: ActivityFactor.SEDENTARY,
      weight: "",
      height: "",
      target: Target.MAINTAIN_WEIGHT,
      birth_date: new Date(),
    },
  });

  const password = watch("password");

  const onSubmit = async (data: any) => {
    try {
      const payload = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        gender: data.gender,
        activity_factor: data.activity_factor,
        target: data.target,
        birth_date: new Date(data.birth_date).toISOString().split("T")[0],
        weight: parseFloat(data.weight),
        height: parseFloat(data.height),
      };

      const result = await USER_API.register(payload);
      console.log("result", result);
      if (result) {
        toast.show({
          placement: "top",
          render: ({ id }) => (
            <Toast nativeID={id} action="success" variant="solid">
              <VStack space="xs">
                <ToastTitle>Registration Successful</ToastTitle>
                <ToastDescription>
                  Your account has been created. Processing to login...
                </ToastDescription>
              </VStack>
            </Toast>
          ),
        });
        setTimeout(() => {
          setShouldCreateAccount(false);
          router.push("/sign-in");
        }, 2000);
      } else {
        showErrorToast("Registration failed. Please try again.");
      }
    } catch (error) {
      showErrorToast(
        "An error occurred. Please check your internet connection.",
      );
    }
  };

  const showErrorToast = (message: string) => {
    toast.show({
      placement: "top",
      render: ({ id }) => (
        <Toast nativeID={id} action="error" variant="solid">
          <VStack space="xs">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </VStack>
        </Toast>
      ),
    });
  };

  const CustomSelect = ({
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
          <Text className="text-typography-900">
            {selectedOption ? selectedOption.label : placeholder}
          </Text>

          <View className="flex-1 justify-center ml-2">
            <ChevronDownIcon className="w-5 h-5" />
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 50 }}
      >
        <View className="mb-8 mt-10">
          <Heading className="text-3xl font-bold text-typography-900">
            Create Account
          </Heading>
          <Text className="text-gray-500 mt-2">
            Fill in your details to get started
          </Text>
        </View>

        <VStack space="xl">
          {/* Email */}
          <VStack space="xs">
            <FormControl isInvalid={!!errors.email}>
              <FormControlLabel>
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input variant="outline" className="h-12 rounded-xl">
                    <InputField
                      placeholder="email@example.com"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCapitalize="none"
                    />
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.email?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>

          {/* First Name & Last Name */}
          <View className="flex-row gap-4">
            <VStack space="xs" className="flex-1">
              <FormControl isInvalid={!!errors.first_name}>
                <FormControlLabel>
                  <FormControlLabelText>First Name</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="first_name"
                  rules={{ required: "Required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input variant="outline" className="h-12 rounded-xl">
                      <InputField
                        placeholder="First Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                />
              </FormControl>
            </VStack>
            <VStack space="xs" className="flex-1">
              <FormControl isInvalid={!!errors.last_name}>
                <FormControlLabel>
                  <FormControlLabelText>Last Name</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="last_name"
                  rules={{ required: "Required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input variant="outline" className="h-12 rounded-xl">
                      <InputField
                        placeholder="Last Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    </Input>
                  )}
                />
              </FormControl>
            </VStack>
          </View>

          {/* Password */}
          <VStack space="xs">
            <FormControl isInvalid={!!errors.password}>
              <FormControlLabel>
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input variant="outline" className="h-12 rounded-xl">
                    <InputField
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!showPassword}
                    />
                    <InputSlot
                      className="pr-3"
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.password?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>

          {/* Confirm Password */}
          <VStack space="xs">
            <FormControl isInvalid={!!errors.confirm_password}>
              <FormControlLabel>
                <FormControlLabelText>Confirm Password</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="confirm_password"
                rules={{
                  validate: (value) =>
                    value === password || "Passwords do not match",
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input variant="outline" className="h-12 rounded-xl">
                    <InputField
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <InputSlot
                      className="pr-3"
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <InputIcon
                        as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                      />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.confirm_password?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>

          {/* Gender */}
          <VStack space="xs">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Gender</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    value={value}
                    onChange={onChange}
                    className="flex-row gap-6"
                  >
                    <Radio value={Gender.MAN}>
                      <RadioIndicator className="border-[#FF8383] data-[checked=true]:border-[#FF8383]">
                        <RadioIcon as={CircleIcon} className="text-[#FF8383]" />
                      </RadioIndicator>
                      <RadioLabel>Male</RadioLabel>
                    </Radio>
                    <Radio value={Gender.WOMAN}>
                      <RadioIndicator className="border-[#FF8383] data-[checked=true]:border-[#FF8383]">
                        <RadioIcon as={CircleIcon} className="text-[#FF8383]" />
                      </RadioIndicator>
                      <RadioLabel>Female</RadioLabel>
                    </Radio>
                  </RadioGroup>
                )}
              />
            </FormControl>
          </VStack>

          {/* Activity Factor & Target */}
          <View className="flex-row gap-4">
            <VStack space="xs" className="flex-1">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Activity Factor</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="activity_factor"
                  render={({ field: { onChange, value } }) => (
                    <CustomSelect
                      label="Activity Factor"
                      options={[
                        { label: "Sedentary", value: ActivityFactor.SEDENTARY },
                        {
                          label: "Lightly Active",
                          value: ActivityFactor.LIGHTLY_ACTIVE,
                        },
                        {
                          label: "Very Active",
                          value: ActivityFactor.VERY_ACTIVE,
                        },
                      ]}
                      value={value}
                      onChange={onChange}
                      placeholder="Select factor"
                    />
                  )}
                />
              </FormControl>
            </VStack>
            <VStack space="xs" className="flex-1">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Target</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="target"
                  render={({ field: { onChange, value } }) => (
                    <CustomSelect
                      label="Target"
                      options={[
                        { label: "Lose Weight", value: Target.LOSE_WEIGHT },
                        {
                          label: "Maintain Weight",
                          value: Target.MAINTAIN_WEIGHT,
                        },
                        { label: "Gain Weight", value: Target.GAIN_WEIGHT },
                      ]}
                      value={value}
                      onChange={onChange}
                      placeholder="Target"
                    />
                  )}
                />
              </FormControl>
            </VStack>
          </View>

          {/* Weight & Height */}
          <View className="flex-row gap-4">
            <VStack space="xs" className="flex-1">
              <FormControl isInvalid={!!errors.weight}>
                <FormControlLabel>
                  <FormControlLabelText>Weight (kg)</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="weight"
                  rules={{ required: "Required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input variant="outline" className="h-12 rounded-xl">
                      <InputField
                        placeholder="60"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="numeric"
                      />
                    </Input>
                  )}
                />
              </FormControl>
            </VStack>
            <VStack space="xs" className="flex-1">
              <FormControl isInvalid={!!errors.height}>
                <FormControlLabel>
                  <FormControlLabelText>Height (cm)</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="height"
                  rules={{ required: "Required" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input variant="outline" className="h-12 rounded-xl">
                      <InputField
                        placeholder="170"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="numeric"
                      />
                    </Input>
                  )}
                />
              </FormControl>
            </VStack>
          </View>

          {/* Birth Date */}
          <VStack space="xs">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Birth Date</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="birth_date"
                render={({ field: { onChange, value } }) => (
                  <View>
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
            </FormControl>
          </VStack>

          <Button
            className="w-full bg-[#FF8383] h-14 rounded-2xl active:bg-[#ff6b6b] mt-6"
            size="lg"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <ButtonText className="text-white font-bold text-lg">
              {isSubmitting ? "Registering..." : "Sign Up"}
            </ButtonText>
          </Button>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-400 font-medium">
              Already have an account?{" "}
            </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text className="text-[#FF8383] font-bold">Log in</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
