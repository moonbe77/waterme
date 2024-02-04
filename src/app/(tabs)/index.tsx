import { StyleSheet } from 'react-native'
import { Button, ButtonText, View } from 'tamagui'
import { schedulePushNotification } from '@/src/service/pushNotifications'

export default function TabOneScreen() {
  const scheduleNotification = () => {
    schedulePushNotification({
      content: {
        title: 'trigger every 15 days',
        body: 'Here is the notification body ',
        badge: 1,
        sound: 'default',
        subtitle: 'subtitle',
        data: { data: 'goes here', url: '/feed' },
      },
      trigger: {
        seconds: 15 * 24 * 60 * 60, // 15 days in seconds
        repeats: true,
      },
    }).then((res) => {
      console.log('schedulePushNotification ', res)
    })
  }

  return (
    <View style={styles.container}>
      <View bg="$primary700" p="$10" borderRadius={15}>
        <Button onPress={scheduleNotification} variant="outlined">
          <ButtonText> set NOTIFICATION</ButtonText>
        </Button>
      </View>
      {/* <View style={styles.separator} /> */}
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
