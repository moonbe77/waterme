import { useEffect, useRef, useState } from 'react'
import { registerForPushNotificationsAsync } from '../service/pushNotifications'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

function useNotification() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>()
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined)
  // const notificationListener = useRef<Notifications.Subscription | undefined>()
  const responseListener = useRef<Notifications.Subscription | undefined>()

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('notification response', response)
      })

    return () => {
      if (responseListener?.current) {
        Notifications.removeNotificationSubscription(responseListener?.current)
      }
    }
  }, [])

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('NOTIFICATION RECEIVED', notification)
        setNotification(notification)
      },
    )
    return () => subscription.remove()
  }, [])

  return {
    expoPushToken,
    notification,
  }
}

export default useNotification
