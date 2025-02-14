import * as Notifications from 'expo-notifications'

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
    return await Notifications.getNextTriggerDateAsync({
      seconds: notification.trigger.seconds,
    })
      .then((res) => {
        console.log('NEXT ✅', res)
        return res
      })
      .catch((error) => {
        console.log('NEXT ERROR ❌', error)
        return null
      })
  }

  if (notification.trigger?.type === 'calendar') {
    return notification.trigger.dateComponents.second ?? null
  }
  return null
}

export const getNextMondayTrigger = (day: number, time: number) => {
  const today = new Date()
  const nextMonday = new Date()
  nextMonday.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7))

  // If today is Monday, schedule for the next Monday
  if (today.getDay() === 1) {
    nextMonday.setDate(today.getDate() + 14)
  }

  // Find the Monday in the correct week interval
  const currentWeek = Math.floor(today.getDate() / 7)
  const targetWeek = currentWeek + 2 - (currentWeek % 2)
  nextMonday.setDate(nextMonday.getDate() + (targetWeek - currentWeek) * 7)

  return {
    weekday: 1, // Monday
    hour: 9,
    minute: 0,
    repeats: true,
  }
}

export async function logNextTriggerDate() {
  console.log('logNextTriggerDate')
  try {
    const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
      weekday: 2,
      hour: 9,
      minute: 0,
    })
    console.log({ nextTriggerDate })
    console.log(
      nextTriggerDate === null
        ? 'No next trigger date'
        : new Date(nextTriggerDate).getDay(),
    )
  } catch (e) {
    console.warn(`Couldn't have calculated next trigger date: ${e}`)
  }
}
