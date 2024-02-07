import { useMutation } from '@tanstack/react-query'
import { scheduleNotification } from './scheduleCustomNotification'

export interface SetNotificationProps {
  days: number
  time: {
    hours: number
    minutes: number
  }
  title: string
  body: string
  subtitle: string
  data: object
}
function useSetNotification() {
  return useMutation<string, Error, SetNotificationProps, string[]>({
    mutationKey: ['setNotification'],
    mutationFn: async (payload) => scheduleNotification(payload),
    // onMutate: (newNotification) => {
    //   // A mutation is about to happen!
    //   // Optionally return a context containing data to use when rolling back
    //   // return { oldNotification: null }
    // },
    onSuccess: (data, variables, context) => {
      // The mutation was successful!
      // Optionally return a context containing data to use when updating the cache
      console.log({ variables, data })
    },
    onError: (error, variables, context) => {
      // The mutation failed!
      // Optionally return a context containing data to use when rolling back
    },
    onSettled: (data, error, variables, context) => {
      // The mutation is done, whether it errored or not
    },
  })
}

export default useSetNotification
