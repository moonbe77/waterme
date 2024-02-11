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
