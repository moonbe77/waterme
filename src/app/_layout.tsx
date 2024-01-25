import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useRef, useState } from 'react'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { registerForPushNotificationsAsync } from '../service/pushNotifications'
import { useNotificationObserver } from '../hooks/useNotificationObserver'

import { Platform } from 'react-native'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { useLoadAssets } from '../hooks/use-load-assets'
export { ErrorBoundary } from 'expo-router'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export const unstable_settings = {
  initialRouteName: '(tabs)',
}
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_900Black,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  return <>{loaded && <RootLayoutNav />}</>
}

export function RootLayoutNav() {
  const { isLoaded } = useLoadAssets()

  const [expoPushToken, setExpoPushToken] = useState('')
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined)
  const notificationListener = useRef<Notifications.Subscription | undefined>()
  const responseListener = useRef<Notifications.Subscription | undefined>()
  useNotificationObserver()

  if (!isLoaded) return null
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification)
  //     })

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response)
  //     })

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener?.current,
  //     )
  //     Notifications.removeNotificationSubscription(responseListener?.current)
  //   }
  // }, [])

  return (
    // <NativeBaseProvider>
    <GluestackUIProvider config={config}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal', headerShown: false }}
        />
      </Stack>
      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
    </GluestackUIProvider>
    // </NativeBaseProvider>
  )
}
