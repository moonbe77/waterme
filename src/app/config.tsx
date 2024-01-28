import { useState } from 'react'
import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed'
import { View } from 'react-native'
import * as Notifications from 'expo-notifications'
import { getAllScheduledNotificationsAsync } from 'expo-notifications'

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

  return (
    <Box>
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
          onPress={getNotifications}
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
        >
          <ButtonText> log NOTIFICATION</ButtonText>
        </Button>
        {scheduledNotifications.map((notification) => (
          <Box key={notification.identifier} mb={'$10'}>
            <Text>{notification.identifier}</Text>
            <Text>{notification.content.title}</Text>
            <Text>{notification.content.body}</Text>
            <Button
              onPress={() => {
                Notifications.cancelScheduledNotificationAsync(
                  notification.identifier,
                )
              }}
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
            >
              <ButtonText> Cancel </ButtonText>
            </Button>
          </Box>
        ))}
      </View>
    </Box>
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
