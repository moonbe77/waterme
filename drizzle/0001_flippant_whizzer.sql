CREATE TABLE `plants` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`next_watering` text,
	`last_watering` text,
	`next_fertilizing` text,
	`last_fertilizing` text,
	`type` text,
	`plant_name` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text
);
