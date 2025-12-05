import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useAuthStore } from "../store/authStore";
import { View, ActivityIndicator, StatusBar } from "react-native";
import { Colors } from "../constants/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Notifications from "expo-notifications";
import { useLastNotificationResponse } from "expo-notifications";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const session = useAuthStore((state) => state.session);
  const router = useRouter();
  const segments = useSegments();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded && !fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    setIsNavigationReady(true);
  }, []);

  const lastNotificationResponse = useLastNotificationResponse();

  useEffect(() => {
    if (lastNotificationResponse && isNavigationReady && fontsLoaded) {
      const data = lastNotificationResponse.notification.request.content.data;
      if (data?.screen) {
        router.push(data.screen as string);
      }
    }
  }, [lastNotificationResponse, isNavigationReady, fontsLoaded, router]);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        if (data?.screen && isNavigationReady && fontsLoaded) {
          router.push(data.screen as string);
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [isNavigationReady, fontsLoaded, router]);

  useEffect(() => {
    if (!isNavigationReady || !fontsLoaded) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inAppGroup = segments[0] === "(app)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
    } else if (session === "guest" && inAuthGroup) {
      router.navigate("/(app)/(stack)/(tabs)/home");
    } else if (session === "guest" && !inAppGroup) {
      router.replace("/(app)/(stack)/(tabs)/home");
    }
  }, [session, segments, isNavigationReady, fontsLoaded]);

  if (!fontsLoaded || fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary700} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar backgroundColor={Colors.primary500} barStyle="light-content" />
    </QueryClientProvider>
  );
}
