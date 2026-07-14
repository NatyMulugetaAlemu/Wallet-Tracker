import { Alert, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { useAuthStore } from "../store/authStore";
import styles from "../assets/styles/profile.styles";
import { COLORS } from "../constants/colors";

export default function SignOutButton() {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    const result = await logout();

    if (result.success) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logged out successfully",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: result.error,
      });
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: handleLogout,
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={confirmLogout}
    >
      <Ionicons
        name="log-out-outline"
        size={20}
        color={COLORS.white}
      />
      <Text style={styles.logoutText}>
        Logout
      </Text>
    </TouchableOpacity>
  );
}