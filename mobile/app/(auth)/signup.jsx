import {View,Text,Image,TextInput,TouchableOpacity,ActivityIndicator,Alert,} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isSigningUp, signup } = useAuthStore();
  
  const router = useRouter();

  const handleSignUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters."
      );
      return;
    }

    const result = await signup({
      username: username.trim(),
      email: email.trim(),
      password,
    });

    console.log("signup result:", result);

    if (result.success) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Signup Failed", result.error);
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