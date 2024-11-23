CREATE TYPE "public"."type" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"birth_date" date NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"type" "type" NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
