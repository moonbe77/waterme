import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

export { ErrorBoundary } from 'expo-router'

function DetailsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[slug]"
        options={{
          title: 'Details',
        }}
      />
      <StatusBar />
    </Stack>
  )
}

export default DetailsLayout
