import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import SafeScreen from "../components/SafeScreen";
import { useAuthStore } from "../store/authStore";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isCheckingAuth) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isSignedIn = !!user;

    if (!isSignedIn && !inAuthGroup) {
      router.replace("/(auth)");
    }

    if (isSignedIn && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, segments, isCheckingAuth]);

  if (isCheckingAuth) {
    return null;
    // Or return <ActivityIndicator />
  }

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}