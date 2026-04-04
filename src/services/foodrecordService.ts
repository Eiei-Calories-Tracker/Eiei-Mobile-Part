import {
  FoodNameRequest,
  FoodNameResponse,
  FoodNutrientsResponse,
  FoodRecordDetail,
  FoodRecordPatchRequest,
  FoodRecordRequest,
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
      // console.log("response", response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  postFoodRecord: async (
    foodRecord: FoodRecordRequest,
    accessToken: string,
  ): Promise<any> => {
    try {
      const formData = new FormData();
      if (foodRecord.image) {
        formData.append("image", foodRecord.image as any);
      }
      formData.append("is_user_create", foodRecord.is_user_create.toString());
      if (foodRecord.food_id !== null) {
        formData.append("food_id", foodRecord.food_id.toString());
      }
      if (foodRecord.new_food_name !== null) {
        formData.append("new_food_name", foodRecord.new_food_name);
      }
      if (foodRecord.new_food_calories !== null) {
        formData.append(
          "new_food_calories",
          foodRecord.new_food_calories.toString(),
        );
      }
      if (foodRecord.new_food_carb !== null) {
        formData.append("new_food_carb", foodRecord.new_food_carb.toString());
      }
      if (foodRecord.new_food_protein !== null) {
        formData.append(
          "new_food_protein",
          foodRecord.new_food_protein.toString(),
        );
      }
      if (foodRecord.new_food_fat !== null) {
        formData.append("new_food_fat", foodRecord.new_food_fat.toString());
      }
      formData.append("quantity", foodRecord.quantity.toString());
      formData.append("eating_time", foodRecord.eating_time);
      console.log("formData", formData);
      const res = await fetch(`${BASE_URL}/api/v1/food_record`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      console.log("res", res);
      if (!res.ok) {
        throw new Error("Failed to post food record");
      }
      const response = await res.json();
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  fetchTargetDateFoodRecord: async (
    date: Date,
    userId: string,
    accessToken: string,
  ) => {
    try {
      const stringDate = date.toLocaleDateString("en-CA");
      const res = await fetch(
        `${BASE_URL}/api/v1/food_record/${userId}/${stringDate}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to get food record");
      }
      const response = await res.json();

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getFoodRecordById: async (
    foodRecordId: string,
    accessToken: string,
  ): Promise<FoodRecordDetail> => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/food_record/${foodRecordId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to get food record");
      }
      const response = await res.json();

      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  patchFoodRecord: async (
    foodRecordId: string,
    foodRecord: FoodRecordPatchRequest,
    accessToken: string,
  ): Promise<any> => {
    try {
      const formData = new FormData();
      if (foodRecord.quantity !== null) {
        formData.append("quantity", foodRecord.quantity.toString());
      }
      if (foodRecord.eating_time !== null) {
        formData.append("eating_time", foodRecord.eating_time);
      }
      const res = await fetch(
        `${BASE_URL}/api/v1/food_record/${foodRecordId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );

      if (!res.ok) {
        throw new Error("Failed to patch food record");
      }
      const response = await res.json();
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
