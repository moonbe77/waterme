import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

export async function scheduleNotification(
  days: number | string = 15,
  {
    title,
    body,
    subtitle,
    data,
  }: {
    title: string
    body: string
    subtitle?: string
    data?: object
  },
) {
  // Request permissions first
  const { status } = await Notifications.requestPermissionsAsync()
  if (status !== 'granted') {
    console.log('Permission not granted for notifications')
    alert('Permission not granted for notifications')
    return
  }

  // Get the current date
  const now = new Date()

  // Calculate the next 10 AM occurrence
  const nextTriggerDate = new Date(now)
  if (now.getHours() >= 10) {
    // If it's already past 10 AM, set the date to the next day
    nextTriggerDate.setDate(nextTriggerDate.getDate() + Number(days))
  }

  nextTriggerDate.setHours(10, 0, 0, 0) // Set time to 10 AM
  console.log('nextTriggerDate', nextTriggerDate)

  // Calculate the trigger in seconds for Android and as a Date object for iOS
  const trigger =
    Platform.OS === 'android'
      ? Math.round((nextTriggerDate.getTime() - now.getTime()) / 1000) +
        15 * 24 * 60 * 60 // Android uses seconds
      : {
          repeats: true,
          date: nextTriggerDate, // iOS can use a Date object
          interval: 'day', // Custom handling may be needed to achieve the exact 15 days interval
        }

  return await Notifications.scheduleNotificationAsync({
    content: {
      title: title ?? 'Watering time! 🌹',
      subtitle: subtitle,
      body: body,
      data: data,
    },
    trigger,
  })
}

// Don't forget to call this function in your app
// scheduleNotification()

export const getNotification = async (id: string) => {
  return await Notifications.getAllScheduledNotificationsAsync().then((res) => {
    return res.find((n) => n.identifier === id)
  })
}
