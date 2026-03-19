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
  setValue: (key: string, value: any) => void;
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

  return (
    <Box className="  w-full h-full">
      {isUserEditing ? (
        <FormControl
          className="flex flex-row h-[20%] items-center"
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
            rules={{
              required: "Food name is required",
            }}
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
          <FormControlError>
            <FormControlErrorText>
              {errors.food_name?.message as string}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      ) : (
        <Box className="flex flex-row h-[20%]  items-center">
          <Text className="w-[30%] font-semibold ">Food Name</Text>
          <Text className="w-[70%] font-medium">{foodName}</Text>
        </Box>
      )}
      <Button
        className="w-[80%] mx-auto bg-[#FF8383] h-14 rounded-2xl active:bg-[#ff6b6b] mt-6"
        size="lg"
        onPress={isUserEditing ? onSavePress : () => setisUserEditing(true)}
      >
        <ButtonText>{isUserEditing ? "Confirm Save" : "Edit Name"}</ButtonText>
      </Button>
    </Box>
  );
}
