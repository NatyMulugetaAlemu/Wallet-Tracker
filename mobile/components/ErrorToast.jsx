import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../assets/styles/ErrorToast.styles";
import { COLORS } from "../constants/colors";

export default function ErrorToast({ title, message }) {
  return (
    <View style={styles.container}>
      <View style={styles.leftBar} />

      <View style={styles.iconContainer}>
        <MaterialIcons
          name="error-outline"
          size={24}
          color={COLORS.background}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}