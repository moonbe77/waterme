import { useEffect } from 'react'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation'
import { Platform } from 'react-native'
import { Stack, useNavigationContainerRef } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Button, TamaguiProvider } from 'tamagui'
import { useNotificationObserver } from '../hooks/useNotificationObserver'
import { useLoadAssets } from '../hooks/use-load-assets'
import useNotification from '../hooks/useNotification'
import config from '@/tamagui.config'
const queryClient = new QueryClient()
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

const tamaguiConfig = config

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })
  const navigationRef = useNavigationContainerRef()

  useReactNavigationDevTools(navigationRef)

  // console.log(tamaguiConfig)
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  return loaded && <RootLayoutNav />
}

export function RootLayoutNav() {
  const { isLoaded } = useLoadAssets()
  useNotificationObserver()

  const { notification } = useNotification()

  useEffect(() => {
    if (notification) {
      // maybe log it to a table so it can be shown later, or something
      alert(
        `${notification?.request.content.title} / ${notification?.request.content.body}`,
      )
    }
  }, [notification])

  if (!isLoaded) return null
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          {/* <Stack.Screen name="details" options={{ headerShown: false }} /> */}
          <Stack.Screen
            name="create"
            options={{
              presentation: 'card',
              headerShown: true,
              title: 'Set a New Remainder',
            }}
          />
          <Stack.Screen
            name="config"
            options={{ presentation: 'modal', headerShown: false }}
          />
        </Stack>
        <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
      </TamaguiProvider>
    </QueryClientProvider>
  )
}
