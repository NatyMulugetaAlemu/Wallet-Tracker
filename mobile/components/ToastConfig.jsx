import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

const ToastItem = ({ type, text1, text2 }) => {
  const toastStyles = {
    success: {
      color: "#22C55E",
      icon: "checkmark-circle",
    },
    error: {
      color: "#EF4444",
      icon: "close-circle",
    },
    info: {
      color: "#3B82F6",
      icon: "information-circle",
    },
    warning: {
      color: "#F59E0B",
      icon: "warning",
    },
  };

  const current = toastStyles[type] || toastStyles.info;

  return (
    <View style={styles.container}>
      {/* Left Color Bar */}
      <View
        style={[
          styles.leftBar,
          { backgroundColor: current.color },
        ]}
      />

      <Ionicons
        name={current.icon}
        size={25}
        color={current.color}
        style={styles.icon}
      />

      <View style={styles.content}>
        <Text style={styles.title}>
          {text1}
        </Text>

        {text2 && (
          <Text style={styles.message}>
            {text2}
          </Text>
        )}
      </View>
    </View>
  );
};


export const toastConfig = {
  success: ({ text1, text2 }) => (
    <ToastItem
      type="success"
      text1={text1}
      text2={text2}
    />
  ),

  error: ({ text1, text2 }) => (
    <ToastItem
      type="error"
      text1={text1}
      text2={text2}
    />
  ),

  info: ({ text1, text2 }) => (
    <ToastItem
      type="info"
      text1={text1}
      text2={text2}
    />
  ),

  warning: ({ text1, text2 }) => (
    <ToastItem
      type="warning"
      text1={text1}
      text2={text2}
    />
  ),
};


const styles = StyleSheet.create({
  container: {
    width: "90%",
    minHeight: 75,
    backgroundColor:COLORS.background,

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 12,
    overflow: "hidden",

    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,

    elevation: 6,
  },

  leftBar: {
    width: 5,
    height: "100%",
  },

  icon: {
    marginLeft: 15,
  },

  content: {
    flex: 1,
    marginLeft: 12,
    paddingVertical: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text
  },

  message: {
    marginTop: 3,
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "600",
  },
});