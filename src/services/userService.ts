const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const USER_API = {
  getUserById: async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);
      console.log("URL:", `${BASE_URL}/users/${id}`);

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
