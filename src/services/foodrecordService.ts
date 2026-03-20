const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const FOODRECORD_API = {
  fetchTargetDateFoodRecord: async (date: Date, userId: string) => {
    try {
      const stringDate = date.toLocaleDateString("en-CA");
      const res = await fetch(
        `${BASE_URL}/api/v1/foodrecord/${userId}/${stringDate}`,
      );

      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },
};
