import * as Notifications from 'expo-notifications'
import moment from 'moment'
import { Platform } from 'react-native'
import type { SetNotificationProps } from './useSetNotification'

export async function scheduleNotification(data: SetNotificationProps) {
  // Request permissions first
  // if (data.days < 1 || Number.isNaN(data.days)) {
  //   throw new Error('Invalid days interval')
  // }
  const { status } = await Notifications.requestPermissionsAsync()

  if (status !== 'granted') {
    throw Error('Permission not granted for notifications')
  }

  // Calculate the trigger in seconds for Android and as a Date object for iOS
  const seconds = secondsUntilTime(data.days, data.time)
  const trigger: Notifications.NotificationTriggerInput = {
    repeats: true,
    second: seconds,
    // timezone: 'Sydney/Australia',
  }

  console.log('trigger generated', { data, trigger })

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
  console.log('getNextTriggerDate  LOL', data)

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

export function secondsUntilTime(
  intervalInDays: number,
  timeOfDay: {
    hours: number
    minutes: number
  },
) {
  // Get current date
  const currentDate = moment().startOf('day')

  // Add interval in days
  const targetDate = currentDate.clone().add(intervalInDays, 'days')

  // Parse time of day and set it on targetDate
  const { hours, minutes } = timeOfDay
  targetDate.set({ hours, minutes })

  // Calculate difference in seconds
  const secondsUntilTarget = targetDate.diff(moment(), 'seconds')

  return secondsUntilTarget
}
