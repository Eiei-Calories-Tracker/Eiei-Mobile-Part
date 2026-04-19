const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
export const ACCOUNT_API = {
  getProfile: async (accessToken: string) => {
    try {
      const res = await fetch(`${BASE_URL}/api/v1/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
