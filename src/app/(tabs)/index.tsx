import { StyleSheet } from 'react-native'
import { getAllScheduledNotificationsAsync } from 'expo-notifications'
import { View } from '../../components/Themed'
import { Text, Button, ButtonText, Box } from '@gluestack-ui/themed'

import { useNotes } from '@/src/hooks/use-notes-store'
import { schedulePushNotification } from '@/src/service/pushNotifications'

export default function TabOneScreen() {
  const notes = useNotes()

  console.log('notes ', notes)

  const scheduleNotification = () => {
    schedulePushNotification({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: null,
    }).then((res) => {
      console.log('schedulePushNotification ', res)
    })
  }

  const testeDrizzle = () => {
    console.log('testeDrizzle')
  }

  return (
    <View style={styles.container}>
      <Box bg="$primary500" p="$10" borderRadius={15}>
        <Text style={styles.title}>Home</Text>

        <Button
          onPress={scheduleNotification}
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
        >
          <ButtonText> set NOTIFICATION</ButtonText>
        </Button>

        <Button
          onPress={testeDrizzle}
          size="md"
          variant="outline"
          // action="info"
          isDisabled={false}
          isFocusVisible={false}
        >
          <ButtonText>Drizzle</ButtonText>
        </Button>
      </Box>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
