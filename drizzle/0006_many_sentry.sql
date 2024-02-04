CREATE TABLE `plants` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`next_watering` text,
	`last_watering` text,
	`next_fertilizing` text,
	`last_fertilizing` text,
	`notification_time` text,
	`notification_day` text,
	`notification_interval` text,
	`notification_id` text,
	`type` text,
	`plant_name` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text
);
