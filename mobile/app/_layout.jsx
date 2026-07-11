import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { useState } from "react";
export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, newUser, token } = useAuthStore();

   const [isReady, setIsReady] = useState(false);

 useEffect(() => {
    const init = async () => {
      await checkAuth();
      setIsReady(true);
    };

    init();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = !!(newUser && token);

    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)");
    } else if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }
  }, [isReady, newUser, token, segments]);

  if (!isReady) {
    return null; // or your loading screen
  }



  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}





// return (
//     <KeyboardAwareScrollView
//       style={{ flex: 1 }}
//       contentContainerStyle={{ flexGrow: 1 }}
//       enableOnAndroid={true}
//       enableAutomaticScroll={true}
//       extraScrollHeight={30}
//     >
//       <View style={styles.container}>
//         <Image source={require("../../assets/images/revenue-i4.png")} style={styles.illustration} />
//         <Text style={styles.title}>Welcome Back</Text>

//         {error ? (
//           <View style={styles.errorBox}>
//             <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
//             <Text style={styles.errorText}>{error}</Text>
//             <TouchableOpacity onPress={() => setError("")}>
//               <Ionicons name="close" size={20} color={COLORS.textLight} />
//             </TouchableOpacity>
//           </View>
//         ) : null}

//         <TextInput
//           style={[styles.input, error && styles.errorInput]}
//           autoCapitalize="none"
//           value={emailAddress}
//           placeholder="Enter email"
//           placeholderTextColor="#9A8478"
//           onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
//         />

//         <TextInput
//           style={[styles.input, error && styles.errorInput]}
//           value={password}
//           placeholder="Enter password"
//           placeholderTextColor="#9A8478"
//           secureTextEntry={true}
//           onChangeText={(password) => setPassword(password)}
//         />

//         <TouchableOpacity style={styles.button} onPress={onSignInPress}>
//           <Text style={styles.buttonText}>Sign In</Text>
//         </TouchableOpacity>

//         <View style={styles.footerContainer}>
//           <Text style={styles.footerText}>Don&apos;t have an account?</Text>

//           <Link href="/sign-up" asChild>
//             <TouchableOpacity>
//               <Text style={styles.linkText}>Sign up</Text>
//             </TouchableOpacity>
//           </Link>
//         </View>
//       </View>
//     </KeyboardAwareScrollView>
//   );
// }