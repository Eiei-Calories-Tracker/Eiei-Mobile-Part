import { FoodNameRequest, FoodNameResponse } from "@/interface";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const FOODRECORD_API = {
  postFoodName: async (
    imageFile: FoodNameRequest,
    accessToken: string,
  ): Promise<FoodNameResponse> => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile.file as any);
      console.log("formData", imageFile.file);
      const res = await fetch(`${BASE_URL}/api/v1/food_name`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to get food name");
      }
      const response = await res.json();
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
