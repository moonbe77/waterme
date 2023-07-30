import { Button, StyleSheet } from "react-native";
import { getAllScheduledNotificationsAsync } from "expo-notifications";

import { Text, View } from "../../components/Themed";
import { useEffect } from "react";
export default function TabOneScreen() {
  useEffect(() => {
    getAllScheduledNotificationsAsync().then((res) => {
      console.log("getAllScheduledNotificationsAsync ", res);
    });
  }, []);

  const getNotifications = () => {
    getAllScheduledNotificationsAsync().then((res) => {
      console.log("getAllScheduledNotificationsAsync ", res);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button onPress={getNotifications} title="log NOTIFICATION" />
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
