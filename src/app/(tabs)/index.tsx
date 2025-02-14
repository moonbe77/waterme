import { StyleSheet } from 'react-native'
import { Button, ButtonText, View, Text } from 'tamagui'
import useSetNotification from '@/src/service/useSetNotification'
import { secondsUntilTime } from '@/src/service/scheduleCustomNotification'
import {
  getNextMondayTrigger,
  logNextTriggerDate,
} from '@/src/service/notifications'

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

  const testTrigger = () => {
    const seconds = secondsUntilTime(1, { hours: 10, minutes: 0 })
    // return a date with format: 2022-01-01 00:00:00.000
    return new Date(new Date().getTime() + seconds * 1000).toLocaleString()
  }

  function addNotification() {
    const nextMonday = getNextMondayTrigger(1, 9)
    console.log({ nextMonday })
  }

  function logTrigger() {
    logNextTriggerDate()
  }

  return (
    <View style={styles.container}>
      <View bg="$primary700" p="$10" borderRadius={15}>
        <Button onPress={testNotification} variant="outlined">
          <ButtonText> set NOTIFICATION</ButtonText>
        </Button>
        <Button onPress={addNotification} variant="outlined">
          <ButtonText> set Monday notification</ButtonText>
        </Button>
        <Button onPress={logNextTriggerDate} variant="outlined">
          <ButtonText> log next trigger</ButtonText>
        </Button>
      </View>
      <View bg="$primary900" p="$10" borderRadius={15}>
        <Text>Trigger TEST</Text>
        <Text>secondsUntilTime(1, hours: 10, minutes: 0 )</Text>

        <Text>{testTrigger()}</Text>
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
