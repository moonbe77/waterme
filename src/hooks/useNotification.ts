import { useEffect, useRef, useState } from 'react'
import { registerForPushNotificationsAsync } from '../service/pushNotifications'
import * as Notifications from 'expo-notifications'
import { router } from 'expo-router'

function useNotification() {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>()
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined)
  // const notificationListener = useRef<Notifications.Subscription | undefined>()
  const responseListener = useRef<Notifications.Subscription | undefined>()

  useEffect(() => {
    let isMounted = true
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    })
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.url
      if (url) {
        router.push(url)
      }
    }
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('addNotificationResponseReceivedListener', response)
        if (!isMounted || !response?.notification) {
          return
        }
        redirect(response.notification)
      })

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('addNotificationReceivedListener', notification)
        setNotification(notification)
      },
    )

    return () => {
      subscription.remove()
      isMounted = false
      if (responseListener?.current) {
        Notifications.removeNotificationSubscription(responseListener?.current)
      }
    }
  }, [])

  return {
    expoPushToken,
    notification,
  }
}

export default useNotification
