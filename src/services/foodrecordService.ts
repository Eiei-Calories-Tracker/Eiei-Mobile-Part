import { FoodNameRequest } from "@/interface";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const FOODRECORD_API = {
  postFoodName: async (imageFile: FoodNameRequest, accessToken: string) => {
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
      console.log("res", await res.json());
      if (!res.ok) {
        throw new Error("Failed to get food name");
      }

      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },
};
