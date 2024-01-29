// create user schema
import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey(),
  title: text('title'),
  body: text('body'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at'),
})

export const plants = sqliteTable('plants', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  nextWatering: text('next_watering'),
  lastWatering: text('last_watering'),
  nextFertilizing: text('next_fertilizing'),
  lastFertilizing: text('last_fertilizing'),
  notificationTime: text('notification_time'),
  type: text('type'),
  plantName: text('plant_name'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at'),
})

export const notifications = sqliteTable('notifications', {
  id: integer('id').primaryKey(),
  title: text('title'),
  body: text('body'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at'),
  notif_id: text('notif_id'),
  plant_id: text('plant_id'),
})

export type SelectNote = typeof notes.$inferSelect
export type SelectPlants = typeof plants.$inferSelect
export type SelectNotifications = typeof notifications.$inferSelect
