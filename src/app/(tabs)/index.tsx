import { StyleSheet } from 'react-native'
import { Button, ButtonText, View } from 'tamagui'
import { schedulePushNotification } from '@/src/service/pushNotifications'

export default function TabOneScreen() {
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
      <View bg="$primary700" p="$10" borderRadius={15}>
        <Button onPress={scheduleNotification} variant="outlined">
          <ButtonText> set NOTIFICATION</ButtonText>
        </Button>

        <Button onPress={testeDrizzle} variant="outlined">
          <ButtonText>Drizzle</ButtonText>
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
