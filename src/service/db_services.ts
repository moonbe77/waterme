import { cancelAllScheduledNotifications } from './pushNotifications'

import { openDatabase } from './sqlite'

const db = openDatabase()

export const getPlants = (callback, onSuccess, onError) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`SELECT * FROM plants`, [], (_, { rows }) => {
        callback(rows._array)
      })
    },
    (error) => {
      onError(error)
    },
    () => {
      onSuccess()
    },
  )
}

export const deleteAll = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(`DELETE FROM plants`)
    },
    null,
    () => {
      cancelAllScheduledNotifications()
    },
  )
}
