import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Platform, Alert, } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/auth.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, login } = useAuthStore();

  const router = useRouter();

  const handleLogin = async () => {
  const result = await login(formData);

    if (result.success) {
      router.replace("/(tabs)");
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: result.error,
        position: "top",
        visibilityTime: 4000,
      });

      return;
    }
  };


  return (

    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: '#fff' }}
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: COLORS.background,
      }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={40}
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
                value={formData.email}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    email: text,
                  })
                }
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              {/* LEFT ICON */}
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              {/* INPUT */}
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholderText}
                value={formData.password}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    password: text,
                  })
                }
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

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoggingIn}>
            {isLoggingIn ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>

      </View>
      {/* </KeyboardAvoidingView> */}
    </KeyboardAwareScrollView>
  );
}
