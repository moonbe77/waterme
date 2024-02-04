/* eslint-disable no-unused-vars */
import { db } from '@/db/client'
import { plants, notifications, type Plant } from '@/db/schema'
import { desc } from 'drizzle-orm'
import moment from 'moment'
import { create } from 'zustand'

import { router } from 'expo-router'
import { scheduleNotification } from '../service/notifications'

type SearchStore = {
  searchText: string
  actions: {
    onChangeSearchText: (text: string) => void
  }
}

const useSearchStore = create<SearchStore>((set) => ({
  searchText: '',
  actions: {
    onChangeSearchText: (text) => set({ searchText: text }),
  },
}))

export const useSearchText = () => useSearchStore((state) => state.searchText)
export const useSearchActions = () => useSearchStore((state) => state.actions)

type PlantsStore = {
  plants: Plant[]
  actions: {
    refetch: () => void
  }
}

const usePlantsStore = create<PlantsStore>((set) => {
  const fetchStatement = db.select().from(plants).orderBy(desc(plants.id))
  try {
    return {
      plants: fetchStatement.all(),
      actions: {
        refetch: () => set({ plants: fetchStatement.all() }),
      },
    }
  } catch (error) {
    return {
      plants: [],
      actions: {
        refetch: () => set({ plants: fetchStatement.all() }),
      },
    }
  }
})

export const usePlants = () => usePlantsStore((state) => state.plants)
export const usePlantsActions = () => usePlantsStore((state) => state.actions)

type EditPlant = Omit<Plant, 'createdAt' | 'id'>
type EditPlantStore = {
  plant: EditPlant
  error: {
    status: string
    message: string
  }
  actions: {
    onChange: (prop: keyof Plant, value: unknown) => void
    // onChangeName: (name: string) => void
    // onChangeDescription: (body: string) => void
    // onChangeType: (type: string) => void
    // onChangePlantName: (plantName: string) => void
    // onChangeNextWatering: (nextWatering: string) => void
    // onChangeNextFertilizing: (nextFertilizing: string) => void
    // onChangeNotificationTime: (notificationTime: Date) => void
    // onChangeNotificationDay: (notificationDay: number | string) => void
    // onChangeNotificationInterval: (notificationInterval: string) => void
    savePlant: (id: string) => void
    // deleteNote: (id: string) => void
  }
}

const useEditPlantStore = create<EditPlantStore>((set, get) => ({
  plant: {
    name: '',
    description: '',
    type: '',
    plantName: '',
    nextWatering: '',
    nextFertilizing: '',
    notificationTime: '',
    notificationDay: '0',
    notificationInterval: '1',
    lastFertilizing: '',
    lastWatering: '',
    updatedAt: '',
    notificationId: '',
  },
  error: {
    status: '',
    message: '',
  },
  actions: {
    onChange: (prop: keyof Plant, value: any) => {
      set({
        plant: {
          ...get().plant,
          [prop]: value,
        },
      })
    },
    // onChangeName: (name) =>
    //   set((state) => ({ plant: { ...state.plant, name } })),
    // onChangeDescription: (description) =>
    //   set((state) => ({ plant: { ...state.plant, description } })),
    // onChangeType: (type) =>
    //   set((state) => ({ plant: { ...state.plant, type } })),
    // onChangePlantName: (plantName) =>
    //   set((state) => ({ plant: { ...state.plant, plantName } })),
    // onChangeNextWatering: (nextWatering) =>
    //   set((state) => ({ plant: { ...state.plant, nextWatering } })),
    // onChangeNextFertilizing: (nextFertilizing) =>
    //   set((state) => ({ plant: { ...state.plant, nextFertilizing } })),
    // onChangeNotificationTime: (notificationTime) =>
    //   set((state) => ({ plant: { ...state.plant, notificationTime } })),
    // onChangeNotificationDay: (notificationDay) =>
    //   set((state) => ({
    //     plant: { ...state.plant, notificationDay: Number(notificationDay) },
    //   })),
    // onChangeNotificationInterval: (notificationInterval) =>
    //   set((state) => ({ plant: { ...state.plant, notificationInterval } })),

    savePlant: (id) => {
      const {
        name,
        description,
        type,
        plantName,
        nextWatering,
        nextFertilizing,
        notificationTime,
        notificationInterval,
      } = get().plant

      if (!name || name === '') {
        set({
          error: {
            status: 'error',
            message: 'Please enter name',
          },
        })
        return
      } else {
        set({
          error: {
            status: '',
            message: '',
          },
        })
      }
      if (!notificationInterval || notificationInterval === '') {
        set({
          error: {
            status: 'error',
            message: 'Please enter notification interval',
          },
        })
        return
      } else {
        set({
          error: {
            status: '',
            message: '',
          },
        })
      }

      // convert notification time to local time using momentjs and then convert to ISO string
      const localeTime = moment(notificationTime).local().toISOString()
      // add to current x amount of days
      const nextWateringDate = moment(nextWatering).add(
        notificationInterval,
        'days',
      )

      const plant = get().plant

      // calculate how many hours from now to the next watering date
      scheduleNotification(notificationInterval, {
        title: 'Watering time! 🌹',
        body: `Don't forget to water ${name}`,
        data: { data: plant },
      })
        .then((res) => {
          console.log('schedulePushNotification ', res)
          if (!res) {
            set({
              error: {
                status: 'error',
                message: 'Failed to schedule notification',
              },
            })
            return
          }

          db.insert(plants)
            .values({
              id: res,
              name,
              description,
              updatedAt: new Date().toISOString(),
              notificationInterval: notificationInterval,
              notificationId: res,
              // type,
              // plantName,
              // nextWatering,
              // nextFertilizing,
              // notificationTime: localeTime,
              // notificationDay: '0',
              // lastWatering: '',
              // lastFertilizing: '',
            })
            .then((res) => {
              console.log('insert plant ', res)
            })
            .catch((err) => {
              console.log('insert plant err', err)
            })
          // .onConflictDoUpdate({
          //   target: plants.id,
          //   set: { name, description, updatedAt: new Date().toISOString() },
          // })
          // .run()

          db.insert(notifications)
            .values({
              id: res,
              notif_id: res,
              plant_id: res,
            })
            .then((res) => {
              console.log('insert notification ', res)
            })
            .catch((err) => {
              console.log('insert notification err', err)
            })
        })
        .catch((err) => {
          console.log('schedulePushNotification err', err)
        })
        .finally(() => {
          router.back()
        })

      set({
        plant: {
          name: '',
          description: '',
          type: '',
          plantName: '',
          nextWatering: '',
          nextFertilizing: '',
          notificationTime: '',
          notificationDay: '0',
          notificationInterval: '1',
          lastWatering: '',
          lastFertilizing: '',
          updatedAt: '',
          notificationId: '',
        },
        error: {
          status: '',
          message: '',
        },
      })
      usePlantsStore.getState().actions.refetch()
    },
    // deleteNote: (id) => {
    //   db.delete(notes)
    //     .where(eq(notes.id, Number(id)))
    //     .run()
    //   useNoteStore.getState().actions.refetch()
    // },
  },
}))

export const useEditPlant = () => useEditPlantStore((state) => state.plant)
export const useEditPlantError = () => useEditPlantStore((state) => state.error)
export const useEditPlantActions = () =>
  useEditPlantStore((state) => state.actions)
