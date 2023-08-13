import { Button, StyleSheet } from 'react-native'
import { getAllScheduledNotificationsAsync } from 'expo-notifications'

import { Text, View } from '../../components/Themed'
import { useEffect } from 'react'
import { openDatabase } from '../../service/sqlite'

const db = openDatabase()

export default function TabOneScreen() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Button onPress={getNotifications} title="log NOTIFICATION" />
      <Button onPress={checkDb} title="check db" />
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
