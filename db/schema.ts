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
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  nextWatering: text('next_watering'),
  lastWatering: text('last_watering'),
  nextFertilizing: text('next_fertilizing'),
  lastFertilizing: text('last_fertilizing'),
  notificationTime: text('notification_time'),
  notificationMinutes: text('notification_minuets'),
  notificationDay: text('notification_day'),
  notificationInterval: text('notification_interval'),
  notificationId: text('notification_id'),
  type: text('type'),
  plantName: text('plant_name'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at'),
})

export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updated_at'),
  notif_id: text('notif_id'),
  plant_id: text('plant_id'),
})

export type SelectNote = typeof notes.$inferSelect
export type Plant = typeof plants.$inferSelect
export type SelectNotifications = typeof notifications.$inferSelect
