import { StyleSheet } from 'react-native'
import { Button, ButtonText, View } from 'tamagui'
import useSetNotification from '@/src/service/useSetNotification'

export default function TabOneScreen() {
  const { mutate } = useSetNotification()
  const testNotification = () => {
    const nowHour = new Date().getHours()
    const nowMinute = new Date().getMinutes() + 15

    mutate({
      days: 0,
      time: {
        hours: 9,
        minutes: 30,
      },
      title: 'TEST log NOTIFICATION',
      body: 'Here is the notification body ',
      subtitle: 'subtitle TEST ',
      data: { data: 'goes here', url: '/feed' },
    })
  }

  return (
    <View style={styles.container}>
      <View bg="$primary700" p="$10" borderRadius={15}>
        <Button onPress={testNotification} variant="outlined">
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
