import { useState } from 'react'
import { View, Button, Text, ScrollView } from 'tamagui'
import { db } from '@/db/client'

import * as Notifications from 'expo-notifications'
import { getAllScheduledNotificationsAsync } from 'expo-notifications'
import { plants, notifications } from '@/db/schema'

function AppConfig() {
  const [permissions, setPermissions] = useState(false)
  const [notificationError, setNotificationError] = useState(false)
  const [scheduledNotifications, setScheduledNotifications] = useState<
    Notifications.NotificationRequest[]
  >([])
  allowsNotificationsAsync()
    .then((res) => {
      setPermissions(res)
    })
    .catch((err) => {
      setNotificationError(true)
      alert(err)
    })

  async function logNextTriggerDate(
    trigger: Notifications.SchedulableNotificationTriggerInput,
  ) {
    try {
      const nextTriggerDate =
        await Notifications.getNextTriggerDateAsync(trigger)
      console.log(
        ' nextTriggerDate >>>> : ',
        nextTriggerDate === null
          ? 'No next trigger date'
          : new Date(nextTriggerDate).getTime(),
      )
    } catch (e) {
      console.warn(`Couldn't have calculated next trigger date: ${e}`)
    }
  }

  const deleteAll = () => {
    Notifications.cancelAllScheduledNotificationsAsync()

    db.delete(plants).all()
    db.delete(notifications).all()
  }

  const getNotifications = () => {
    getAllScheduledNotificationsAsync()
      .then((res) => {
        console.log('getAllScheduledNotificationsAsync ', res)
        setScheduledNotifications(res)
      })
      .then((err) => {
        console.log('getAllScheduledNotificationsAsync err ', err)
      })
  }

  const getTimeNext = (notification: Notifications.NotificationRequest) => {
    const data = notification.content.data
    console.log('getTimeNext √', data)
    if (notification.trigger?.type === 'timeInterval') {
      const seconds = notification.trigger.seconds
      const date = new Date()
      date.setSeconds(seconds - date.getSeconds())
      return `next trigger: ${seconds}  /  ${date}`
    }
    if (notification.trigger?.type === 'calendar') {
      const date = notification.trigger.dateComponents
      logNextTriggerDate(notification.trigger)
      return `type calendar: ${date?.hour}:${date?.minute} ${date?.day}/${date?.month}/${date?.year}`
    }
  }

  return (
    <View p="$4" height="100%" backgroundColor="$blue1">
      <View backgroundColor="red">
        <Text>config</Text>
        <Text>
          Notifications:{' '}
          {permissions ? <Text>allowed</Text> : <Text>not allowed</Text>}
        </Text>
        {notificationError && (
          <Text color="$red">Notification permission Error</Text>
        )}
      </View>
      <View>
        <Button
          onPress={deleteAll}
          size="$4"
          width={200}
          variant="outlined"
          marginBottom="$2"
        >
          DROP ALL
        </Button>
        <Button
          onPress={getNotifications}
          size="$4"
          width={200}
          variant="outlined"
          marginBottom="$10"
        >
          log NOTIFICATION
        </Button>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={'$blue100'}
      >
        {scheduledNotifications.map((notification) => (
          <View key={notification.identifier} marginBottom="$10">
            <Text>{notification.identifier}</Text>
            <Text>{notification.content.title}</Text>
            <Text>{notification.content.body}</Text>
            <Text>{notification.trigger?.type}</Text>

            <Text>{getTimeNext(notification)}</Text>
            <Button
              onPress={() => {
                Notifications.cancelScheduledNotificationAsync(
                  notification.identifier,
                )
              }}
              size="$2"
              variant="outlined"
            >
              Cancel
            </Button>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default AppConfig

export async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync()
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  )
}
