import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todos = sqliteTable("todo", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description"),
	completed: integer("completed", { mode: "boolean" }).notNull().default(false),
	userId: text("user_id").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
