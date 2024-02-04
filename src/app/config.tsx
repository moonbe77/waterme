import { useState } from 'react'
import { View, Button, Text } from 'tamagui'
import { db } from '@/db/client'

import * as Notifications from 'expo-notifications'
import { getAllScheduledNotificationsAsync } from 'expo-notifications'
import { plants } from '@/db/schema'

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
  }

  const getNotifications = () => {
    getAllScheduledNotificationsAsync()
      .then((res) => {
        console.log('getAllScheduledNotificationsAsync ', res)
        // logNextTriggerDate()
        setScheduledNotifications(res)
      })
      .then((err) => {
        console.log('getAllScheduledNotificationsAsync err ', err)
      })
  }

  return (
    <View>
      <Text>config</Text>
      <Text>
        Notifications:{' '}
        {permissions ? <Text>allowed</Text> : <Text>not allowed</Text>}
      </Text>
      {notificationError && (
        <Text color="$red">Notification permission Error</Text>
      )}
      <View>
        <Button
          onPress={deleteAll}
          size="$4"
          width={200}
          variant="outlined"
          marginBottom="$10"
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
        {scheduledNotifications.map((notification) => (
          <View key={notification.identifier} marginBottom="$10">
            <Text>{notification.identifier}</Text>
            <Text>{notification.content.title}</Text>
            <Text>{notification.content.body}</Text>
            <Text>{notification.trigger?.type}</Text>

            <Text></Text>
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
      </View>
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
