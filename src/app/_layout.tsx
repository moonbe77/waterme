import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

import { useNotificationObserver } from '../hooks/useNotificationObserver'

import { Platform } from 'react-native'
import { GluestackUIProvider } from '@gluestack-ui/themed'
import { config } from '@gluestack-ui/config'
import { useLoadAssets } from '../hooks/use-load-assets'

import useNotification from '../hooks/useNotification'
export { ErrorBoundary } from 'expo-router'

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
  useNotificationObserver()

  const { notification, expoPushToken } = useNotification()

  console.log('expoPushToken ', {
    notification,
    expoPushToken,
  })
  if (!isLoaded) return null

  return (
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
  )
}
