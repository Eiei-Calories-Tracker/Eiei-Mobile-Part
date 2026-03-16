const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const NUTRIENT_API = {
  fetchWeekNutrient: async (userId: string, date: Date) => {
    try {
      const strDate = date.toISOString().split("T")[0];
      const res = await fetch(
        `${BASE_URL}/api/v1/nutrients/${userId}/${strDate}`,
      );

      if (!res.ok) {
        throw new Error("Failed to get this week nutrients");
      }

      return await res.json();
    } catch (err) {
      console.log(err);
    }
  },
};
