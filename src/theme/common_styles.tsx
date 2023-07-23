// styles for a pressable button
import { StyleSheet } from "react-native";
export const pressable = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#000",
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#fff",
  },
});

export const input = StyleSheet.create({
  input: {
    borderRadius: 8,
    fontSize: 16,
    padding: 8,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    height: 45,
  },
});

export const themedComponents = {
  pressable,
  input,
};
