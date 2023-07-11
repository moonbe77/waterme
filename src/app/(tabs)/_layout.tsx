import { Tabs } from "expo-router/tabs";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
export default function AppLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        // Name of the route to hide.
        name="home"
        options={{
          // This tab will no longer show up in the tab bar.
          href: "/",
          headerTitle: "Home",
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="feed"
        options={{
          href: "/feed/",
          headerTitle: "Feed",
          title: "Feed",
        }}
      />
    </Tabs>
  );
}
