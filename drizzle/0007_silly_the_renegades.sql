ALTER TABLE plants ADD `notification_minuets` text;--> statement-breakpoint
ALTER TABLE `notifications` DROP COLUMN `title`;--> statement-breakpoint
ALTER TABLE `notifications` DROP COLUMN `body`;