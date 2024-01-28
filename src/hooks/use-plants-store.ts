import { db } from '@/db/client'
import { plants, type SelectPlants } from '@/db/schema'
import { desc } from 'drizzle-orm'
import moment from 'moment'
import { create } from 'zustand'

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
  plants: SelectPlants[]
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

type EditPlantStore = {
  plant: {
    name: string
    description: string
    type: string
    plantName: string
    nextWatering: string
    nextFertilizing: string
    notificationTime: Date
  }
  actions: {
    onChangeName: (name: string) => void
    onChangeDescription: (body: string) => void
    onChangeType: (type: string) => void
    onChangePlantName: (plantName: string) => void
    onChangeNextWatering: (nextWatering: string) => void
    onChangeNextFertilizing: (nextFertilizing: string) => void
    onChangeNotificationTime: (notificationTime: Date) => void
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
    notificationTime: new Date(),
  },
  actions: {
    onChangeName: (name) =>
      set((state) => ({ plant: { ...state.plant, name } })),
    onChangeDescription: (body) =>
      set((state) => ({ plant: { ...state.plant, body } })),
    onChangeType: (type) =>
      set((state) => ({ plant: { ...state.plant, type } })),
    onChangePlantName: (plantName) =>
      set((state) => ({ plant: { ...state.plant, plantName } })),
    onChangeNextWatering: (nextWatering) =>
      set((state) => ({ plant: { ...state.plant, nextWatering } })),
    onChangeNextFertilizing: (nextFertilizing) =>
      set((state) => ({ plant: { ...state.plant, nextFertilizing } })),
    onChangeNotificationTime: (notificationTime) =>
      set((state) => ({ plant: { ...state.plant, notificationTime } })),

    savePlant: (id) => {
      const {
        name,
        description,
        type,
        plantName,
        nextWatering,
        nextFertilizing,
        notificationTime,
      } = get().plant
      // convert notification time to local time using momentjs and then convert to ISO string
      const localeTime = moment(notificationTime).local().toISOString()

      if (!name) return
      db.insert(plants)
        .values({
          id: Number(id),
          name,
          description,
          type,
          plantName,
          nextWatering,
          nextFertilizing,
          notificationTime: localeTime,
        })
        .onConflictDoUpdate({
          target: plants.id,
          set: { name, description, updatedAt: new Date().toISOString() },
        })
        .run()
      set({
        plant: {
          name: '',
          description: '',
          type: '',
          plantName: '',
          nextWatering: new Date().toISOString(),
          nextFertilizing: new Date().toISOString(),
          notificationTime: new Date(),
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
export const useEditPlantActions = () => useEditPlantStore((state) => state)
