import { Button, Pressable, StyleSheet } from "react-native";
import { pressable } from "../../theme/common_styles";

// import EditScreenInfo from "../../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { schedulePushNotification } from "../../service/pushNotifications";
export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button onPress={schedulePushNotification} title="Set NOTIFICATION" />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
