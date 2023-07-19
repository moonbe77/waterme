import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_900Black,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return <>{loaded && <RootLayoutNav />}</>;
}

export function RootLayoutNav() {
  return (
    <>
      {/* <ErrorToastContainer> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", headerShown: false }}
        />
        {/* <Stack.Screen name="/details" options={{}} /> */}
      </Stack>
      {/* </ErrorToastContainer> */}
      <StatusBar />
    </>
  );
}
