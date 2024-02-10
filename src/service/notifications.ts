import * as Notifications from 'expo-notifications'
import moment from 'moment'
import { Platform } from 'react-native'
import type { SetNotificationProps } from './useSetNotification'

export async function scheduleNotification(data: SetNotificationProps) {
  // Request permissions first
  if (data.days < 1 || Number.isNaN(data.days)) {
    throw new Error('Invalid days interval')
  }
  const { status } = await Notifications.requestPermissionsAsync()

  if (status !== 'granted') {
    throw Error('Permission not granted for notifications')
  }

  // Calculate the trigger in seconds for Android and as a Date object for iOS
  const seconds = secondsUntilTime(data.days, 10)
  const trigger =
    Platform.OS === 'android'
      ? seconds
      : {
          repeats: true,
          seconds: seconds, // iOS can use a Date object
          // interval: 'day', // Custom handling may be needed to achieve the exact 15 days interval
        }

  console.log('trigger', trigger)

  return Notifications.scheduleNotificationAsync({
    content: {
      title: data.title ?? 'Watering time! 🌹',
      subtitle: data.subtitle,
      body: data.body,
      data: data.data,
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
  console.log('getNextTriggerDate > notification', notification)

  if (notification.trigger?.type === 'timeInterval') {
    const next = await Notifications.getNextTriggerDateAsync({
      seconds: notification.trigger.seconds,
    })
      .then((res) => {
        console.log('NEXT ✅', res)
        return res
      })
      .catch((error) => {
        console.log('NEXT ERROR ❌', error)
        return error
      })

    // const seconds = notification.trigger.seconds
    const date = new Date(next ?? 0)
    // date.setSeconds(seconds - date.getSeconds())
    return date
  }

  if (notification.trigger?.type === 'calendar') {
    Notifications.getNextTriggerDateAsync(notification.trigger)
      .then((res) => {
        console.log('NEXT CALENDAR ✅', res)
        // return res?.toLocaleString()
      })
      .catch((error) => {
        console.log('NEXT  CALENDAR  ERROR ❌', error)
        // return error
      })

    return `type calendar:`
  }
}

function secondsUntilTime(intervalInDays: number, timeOfDay: number) {
  // Get current date
  const currentDate = moment().startOf('day')

  // Add interval in days
  const targetDate = currentDate.clone().add(intervalInDays, 'days')

  // Parse time of day and set it on targetDate
  // const [hours, minutes, seconds] = timeOfDay.split(':').map(Number)
  targetDate.set({ hours: timeOfDay, minutes: 0, seconds: 0 })

  // Calculate difference in seconds
  const secondsUntilTarget = targetDate.diff(moment(), 'seconds')

  return secondsUntilTarget
}
