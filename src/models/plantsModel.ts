export interface IPlant {
  id: number
  title: string
  name: string
  description: string
  image: string
  type: string
  notificationId: string
  lastWatered: string
  nextWatering: string
  lastFertilized: string
  nextFertilizing: string
  notificationTime: Date
  notes: string
  createdOn: Date
  createdBy: string
  editedOn: Date
  editedBy: string
}
