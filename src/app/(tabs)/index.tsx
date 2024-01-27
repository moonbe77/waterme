import { StyleSheet } from 'react-native'
import { getAllScheduledNotificationsAsync } from 'expo-notifications'
import { View } from '../../components/Themed'
import { Text, Button, ButtonText, Box } from '@gluestack-ui/themed'

import { openDatabase } from '../../service/sqlite'
import { useNotes } from '@/src/hooks/use-notes-store'

const db = openDatabase()

export default function TabOneScreen() {
  const notes = useNotes()

  console.log('notes ', notes)

  const getNotifications = () => {
    getAllScheduledNotificationsAsync().then((res) => {
      console.log('getAllScheduledNotificationsAsync ', res)
    })
  }

  const checkDb = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT * FROM PRAGMA_TABLE_INFO("plants")',
          [],
          (tx, results) => {
            console.log('Query completed', { tx, results })
            const len = results.rows.length
            if (len > 0) {
              console.log('len ', len)
              const row = results.rows.item(0)
              console.log('row ', row)
            }
          },
        )
      },
      (error) => {
        console.log('error ERROR', error)
      },
      (...rest) => {
        console.log('success', rest)
      },
    )
  }

  const testeDrizzle = () => {
    console.log('testeDrizzle')
  }

  return (
    <View style={styles.container}>
      <Box bg="$primary500" p="$10" borderRadius={15}>
        <Text style={styles.title}>Home</Text>
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
        <Button
          onPress={checkDb}
          size="md"
          variant="outline"
          action="positive"
          isDisabled={false}
          isFocusVisible={false}
        >
          <ButtonText>lo g DB</ButtonText>
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
