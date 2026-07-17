import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import { useAuthStore } from "../store/authStore";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { useCustomAlert } from "../store/useCustomAlert";
import CustomAlert from "./CustomAlert";

export default function SignOutButton() {
  const { logout } = useAuthStore();

  const { alert, showAlert, hideAlert } = useCustomAlert();

  const handleLogout = async () => {
    const result = await logout();

    hideAlert();

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
        text2: result.error || "Logout failed",
      });
    }
  };


  const confirmLogout = () => {
    showAlert({
      type: "warning",
      title: "Logout",
      message: "Are you sure you want to logout?",
      onConfirm: handleLogout,
    });
  };


  return (
    <>
      <TouchableOpacity
        style={styles.Button}
        onPress={confirmLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color={COLORS.white}
        />
      </TouchableOpacity>


      <CustomAlert
        visible={alert.visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        confirmText="Logout"
        cancelText="Cancel"
        onConfirm={alert.onConfirm}
        onCancel={hideAlert}
      />
    </>
  );
}