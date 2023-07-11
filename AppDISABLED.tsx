import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ItemsList from "./src/components/ItemsList";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>TEST!</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
