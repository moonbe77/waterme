CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text,
	`body` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text,
	`notif_id` text,
	`plant_id` text
);
