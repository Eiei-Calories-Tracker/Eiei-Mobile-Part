export interface UploadImage {
  uri: string;
  name: string;
  type: string;
}

export interface FoodNameRequest {
  file: UploadImage;
}
