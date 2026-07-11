import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginVertical:0,
    marginHorizontal: 20,
    borderWidth: 1,
    overflow: "hidden",
    borderRadius: 12,
    borderColor: COLORS.border,
  },

  leftBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 7,
    backgroundColor: COLORS.primary,
  },

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 12,
    backgroundColor:COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  textContainer: {
    marginLeft: 15,
    flex: 1,
  },

  title: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "700",
  },

  message: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 4,
  },
});




