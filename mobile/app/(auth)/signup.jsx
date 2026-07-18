import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";
import Toast from "react-native-toast-message";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isSigningUp, signup } = useAuthStore();

  const router = useRouter();

  const handleSignUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Please fill in all fields.",
        visibilityTime: 3000,
      });
      return;
    }

    if (password.length < 6) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Password must be at least 6 characters.",
        visibilityTime: 3000,
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: "Invalid email format",
        visibilityTime: 3000,
      });
      return;
    }

    const result = await signup({
      username: username.trim(),
      email: email.trim(),
      password,
    });

    console.log("signup result:", result);

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Account created successfully",
      });

      setTimeout(() => {
        router.replace({
          pathname: "/verifyemail",
          params: {
            email: email.trim(),
          },
        });
      }, 1000);
    } else {
      Toast.show({
        type: "error",
        text1: "Signup Failed",
        text2: result.error || "Something went wrong",
        visibilityTime: 3000,
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.background,
      }}
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={80}
    >
      <View style={styles.container}>
        {/* ILLUSTRATION */}
        <View style={styles.topIllustration}>
          <Image
            source={require("../../assets/images/revenue-i4.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          {/* USERNAME */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your username"
                placeholderTextColor={COLORS.placeholderText}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />

              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* SIGNUP BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?
            </Text>

            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}