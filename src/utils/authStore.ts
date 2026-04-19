import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const isWeb = Platform.OS === "web";

export type UserData = {
  activity_factor: string;
  birth_date: string;
  email: string;
  first_name: string;
  gender: string;
  height: number;
  last_name: string;
  target: string;
  weight: number;
};

type UserState = {
  isLoggedIn: boolean;
  accessToken: string | null;
  userId: string | null;
  shouldCreateAccount: boolean;
  hasCompletedOnboarding: boolean;
  _hasHydrated: boolean;
  userData: UserData | null;
  logIn: (token: string, userId: string) => void;
  logOut: () => void;
  setShouldCreateAccount: (value: boolean) => void;
  setHasHydrated: (value: boolean) => void;
  setUserData: (data: UserData) => void;
};

export const useAuthStore = create(
  persist<UserState>(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      userId: null,
      userData: null,
      shouldCreateAccount: false,
      hasCompletedOnboarding: false,
      _hasHydrated: false,
      logIn: (token: string, userId: string) => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: true,
            accessToken: token,
            userId: userId,
          };
        });
      },
      logOut: () => {
        set((state) => {
          return {
            ...state,
            isLoggedIn: false,
            accessToken: null,
            userId: null,
            userData: null,
          };
        });
      },
      setUserData: (data: UserData) => {
        set((state) => ({
          ...state,
          userData: data,
        }));
      },
      setShouldCreateAccount: (value: boolean) => {
        set((state) => ({ ...state, shouldCreateAccount: value }));
      },
      setHasHydrated: (value: boolean) => {
        set((state) => {
          return {
            ...state,
            _hasHydrated: value,
          };
        });
      },
    }),
    {
      name: "auth-store",
      storage: isWeb
        ? createJSONStorage(() => localStorage)
        : createJSONStorage(() => ({
            setItem: (key: string, value: string) =>
              SecureStore.setItemAsync(key, value),
            getItem: (key: string) => SecureStore.getItemAsync(key),
            removeItem: (key: string) => SecureStore.deleteItemAsync(key),
          })),
      onRehydrateStorage: () => {
        return (state) => {
          state?.setHasHydrated(true);
        };
      },
    },
  ),
);
