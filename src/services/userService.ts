const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const USER_API = {
  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error logging in:", error);
      return null;
    }
  },

  register: async (userData: any) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error registering user:", error);
      return null;
    }
  },

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
