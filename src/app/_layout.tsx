import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'
import { Platform } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

import config from '@/tamagui.config'
import { TamaguiProvider, createTamagui } from 'tamagui'
import { useNotificationObserver } from '../hooks/useNotificationObserver'
import { useLoadAssets } from '../hooks/use-load-assets'
import useNotification from '../hooks/useNotification'

import '@tamagui/core/reset.css'

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

// const tokens = createTokens({
//   color: {
//     white: '#fff',
//     black: '#000',
//   },
// })

const tamaguiConfig = createTamagui(config)

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  return loaded && <RootLayoutNav />
}

export function RootLayoutNav() {
  const { isLoaded } = useLoadAssets()
  useNotificationObserver()

  const { notification, expoPushToken } = useNotification()

  if (!isLoaded) return null
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="create"
          options={{ presentation: 'modal', headerShown: false }}
        />
        <Stack.Screen
          name="config"
          options={{ presentation: 'modal', headerShown: false }}
        />
      </Stack>
      <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
    </TamaguiProvider>
  )
}
