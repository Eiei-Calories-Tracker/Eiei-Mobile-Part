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
    carbs: number;
    fat: number;
  };
}
