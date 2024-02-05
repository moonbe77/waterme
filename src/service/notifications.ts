import { notifications } from '@/db/schema'
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

export const getAllNotifications = async () => {
  return Notifications.getAllScheduledNotificationsAsync()
}

export const getNotificationById = async (id: string) => {
  return await getAllNotifications().then((res) => {
    return res.find((n) => n.identifier === id)
  })
}

export const cancelNotification = async (id: string) => {
  return Notifications.cancelScheduledNotificationAsync(id)
}

export const getNextTriggerDate = async (
  notification: Notifications.NotificationRequest,
) => {
  const data = notification.content.data
  console.log('notification.content.data', data)

  if (notification.trigger?.type === 'timeInterval') {
    const next = await Notifications.getNextTriggerDateAsync({
      seconds: notification.trigger.seconds,
    })
    // .then((res) => {
    //   console.log('NEXT ✅', res)
    //   return res
    // })
    // .catch((error) => {
    //   console.log('NEXT ERROR ❌', error)
    //   return error
    // })

    // const seconds = notification.trigger.seconds
    const date = new Date(next ?? 0)
    // date.setSeconds(seconds - date.getSeconds())
    return date
  }

  // if (notification.trigger?.type === 'calendar') {
  //   Notifications.getNextTriggerDateAsync(notification.trigger)
  //     .then((res) => {
  //       console.log('NEXT CALENDAR ✅', res)
  //       // return res?.toLocaleString()
  //     })
  //     .catch((error) => {
  //       console.log('NEXT  CALENDAR  ERROR ❌', error)
  //       // return error
  //     })

  //   return `type calendar:`
  // }
}
