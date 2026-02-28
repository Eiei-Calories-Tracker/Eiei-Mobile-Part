const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const USER_API = {
  getUserById: async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/students/${id}`);
      console.log("URL:", `${BASE_URL}/students/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json(); // อ่าน body ครั้งเดียว
      console.log("DATA:", data);

      return data;
    } catch (error) {
      console.error("Error getting user by id:", error);
      return null;
    }
  },
};
