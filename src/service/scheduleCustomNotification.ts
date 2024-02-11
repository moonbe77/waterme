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
  }

  // console.log('trigger generated', { data, trigger })

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

export const convertToTimeZone = (date: moment.MomentInput, zone: string) => {
  const parsed = moment(date).tz(zone)
  console.log('convertToTimeZone', { date, zone, parsed })
  return parsed.format('YYYY-MM-DD HH:mm:ss')
}
