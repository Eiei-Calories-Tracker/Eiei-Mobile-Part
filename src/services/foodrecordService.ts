import {
  FoodNameRequest,
  FoodNameResponse,
  FoodNutrientsResponse,
} from "@/interface";

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
  getFoodNutrients: async (
    accessToken: string,
  ): Promise<FoodNutrientsResponse> => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/food_nutrients`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to get food nutrients");
      }

      const response = await res.json();
      console.log("response", response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
