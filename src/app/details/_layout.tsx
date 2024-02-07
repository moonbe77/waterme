import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export { ErrorBoundary } from 'expo-router'
// Create a client
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
