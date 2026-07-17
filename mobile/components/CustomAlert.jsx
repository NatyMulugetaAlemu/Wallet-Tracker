import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function CustomAlert({
  visible,
  title,
  message,
  type = "error",
  onConfirm,
  onCancel,
  confirmText = "OK",
  cancelText,
}) {
  const colors = {
    error: "#EF4444",
    success:COLORS.primary,
    warning: COLORS.primary
  };

  const icons = {
    error: "close-circle",
    success: "checkmark-circle",
    warning: "warning",
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
       statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Ionicons
            name={icons[type]}
            size={55}
            color={colors[type]}
          />

          <Text style={styles.title}>
            {title}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>


          <View style={styles.buttons}>

            {cancelText && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}


            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: colors[type],
                },
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>
                {confirmText}
              </Text>
            </TouchableOpacity>

          </View>

        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },


  container: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 25,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,

    elevation: 10,
  },


  title: {
    marginTop: 15,
    fontSize: 21,
    fontWeight: "700",
    color: "#111827",
  },


  message: {
    marginTop: 10,
    textAlign: "center",
    color: "#6B7280",
    fontSize: 15,
    lineHeight: 22,
  },


  buttons: {
    flexDirection: "row",
    width: "100%",
    marginTop: 25,
    gap: 12,
  },


  button: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },


  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },


  cancelButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },


  cancelText: {
    color: "#374151",
    fontSize: 16,
    fontWeight: "600",
  },

});