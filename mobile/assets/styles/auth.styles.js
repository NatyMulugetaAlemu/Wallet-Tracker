
import { StyleSheet, Dimensions } from "react-native";
import {COLORS} from "../../constants/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 25,
    justifyContent: "center",
  },

  topIllustration: {
    alignItems: "center",
    width: "100%",
  },
  illustrationImage: {
    width: width * 0.85,
    height: width * 0.85,
  },
 
  formContainer: {
    marginBottom: 50,
  },

  inputGroup: {
    marginBottom: 13,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.textPrimary,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: 12,
    borderRadius:12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
  eyeIcon: {
    padding: 8,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },


  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  footerText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  link: {
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: "600",
  },
});

export default styles;
