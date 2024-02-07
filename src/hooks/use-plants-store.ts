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
    onChange: (prop: keyof Plant, value: string) => void
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

/**  EDIT PLANTS */

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
    onChange: (prop: keyof Plant, value: string) => {
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

      db.insert(plants)
        .values({
          id: id,
          name,
          description,
          type,
          plantName,
          nextWatering,
          nextFertilizing,
          notificationTime,
          updatedAt: new Date().toISOString(),
          notificationInterval: notificationInterval,
          notificationId: id,
        })
        .onConflictDoUpdate({
          target: plants.id,
          set: { name, description, updatedAt: new Date().toISOString() },
        })
        .run()

      db.insert(notifications)
        .values({
          id: id,
          notif_id: id,
          plant_id: id,
        })
        .then((res) => {
          console.log('insert notification ', res)
        })
        .catch((err) => {
          console.log('insert notification err', err)
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
