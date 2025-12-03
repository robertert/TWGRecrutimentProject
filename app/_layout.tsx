import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useAuthStore } from "../store/authStore";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "../constants/colors";

// Zapobiegaj automatycznemu ukryciu splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const session = useAuthStore((state) => state.session);
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  // Ładowanie czcionek
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
  });

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() =>
      setIsReady(true)
    );
    if (useAuthStore.persist.hasHydrated()) setIsReady(true);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (fontsLoaded && isReady && !fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, isReady, fontError]);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/sign-in");
    } else if (session === "guest" && inAuthGroup) {
      router.replace("/(app)/(tabs)/");
    } else if (session === "guest" && segments.length > 0) {
      router.replace("/(app)/(tabs)/");
    }
  }, [session, segments, isReady]);

  if (!isReady || !fontsLoaded || fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary700} />
      </View>
    );
  }

  return <Slot />;
}
