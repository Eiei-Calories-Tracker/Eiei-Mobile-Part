import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import "../../global.css";
import SaveAreaScreen from "../components/SaveAreaScreen";
import { useAuthStore } from "../utils/authStore";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

const isWeb = Platform.OS === "web";

if (!isWeb) {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const {
    isLoggedIn,
    shouldCreateAccount,
    hasCompletedOnboarding,
    _hasHydrated,
  } = useAuthStore();

  // https://zustand.docs.pmnd.rs/integrations/persisting-store-data#how-can-i-check-if-my-store-has-been-hydrated
  // Hide the splash screen after the store has been hydrated
  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  if (!_hasHydrated && !isWeb) {
    return null;
  }

  return (
    <GluestackUIProvider>
      <React.Fragment>
        <StatusBar style="auto" />
        <SaveAreaScreen>
          <Stack>
            <Stack.Protected guard={isLoggedIn}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="createFoodRecord"
                options={{ headerShown: false }}
              />
              {/* modal will access if isLoggedIn */}
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
              <Stack.Screen
                name="cameraFunction"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="foodRecords/[id]"
                options={{ headerShown: false }}
              />
            </Stack.Protected>
            <Stack.Protected guard={!isLoggedIn}>
              {/*  && hasCompletedOnboarding */}
              <Stack.Screen name="sign-in" options={{ headerShown: false }} />
              <Stack.Protected guard={shouldCreateAccount}>
                <Stack.Screen
                  name="create-account"
                  options={{ headerShown: false }}
                />
              </Stack.Protected>
            </Stack.Protected>
            {/* <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected> */}
          </Stack>
        </SaveAreaScreen>
      </React.Fragment>
    </GluestackUIProvider>
  );
}
