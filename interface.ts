export interface UploadImage {
  uri: string;
  name: string;
  type: string;
}

export interface FoodNameRequest {
  file: UploadImage;
}

export interface FoodNameResponse {
  food_id: number;
  food_name: string;
  nutrients: {
    calories: number;
    protein: number;
    carb: number;
    fat: number;
  };
}

export interface FoodNutrientsResponse {
  all_food_nutrients: FoodNutrients[];
}

export interface FoodNutrients {
  food_id: number | null;
  food_name: string;
  calories: number;
  carb: number;
  protein: number;
  fat: number;
}

export interface FoodRecordRequest {
  is_user_create: "1" | "0";
  food_id: number | null;
  new_food_name: string | null;
  new_food_calories: number | null;
  new_food_carb: number | null;
  new_food_protein: number | null;
  new_food_fat: number | null;
  quantity: number;
  eating_time: string;
  image: UploadImage | null;
}

export type NutritionType = {
  calories: number;
  carb: number;
  fat: number;
  protein: number;
};
export type FoodRecordType = {
  food_name: string;
  sum_fat: number;
  sum_calories: number;
  user_id: number;
  image_key: string;
  id: number;
  sum_carb: number;
  sum_protein: number;
  quantity: number;
  eating_time: string;
};
export type WeekNutritionType = {
  cummulative_week_nutrients: NutritionType;
  cummulative_current_day_nutrients: NutritionType;
  target_week_nutrients: NutritionType;
  target_current_day_nutrients: NutritionType;
  current_date: string;
  week_number: number;
  day_state: number;
  day: string;
};

export interface FoodRecordDetail {
  food_record: FoodRecordType;
  food_nutrient: FoodNutrients;
}

export interface FoodRecordPatchRequest {
  quantity: number | null;
  eating_time: string | null;
}
