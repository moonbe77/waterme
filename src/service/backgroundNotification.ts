import * as TaskManager from 'expo-task-manager'
import * as Notifications from 'expo-notifications'

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK'

TaskManager.defineTask(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error, executionInfo }) => {
    console.log('Received a notification in the background!', {
      data,
      error,
      executionInfo,
    })
    // Do something with the notification data
  },
)

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK)
