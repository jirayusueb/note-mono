import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const boards = sqliteTable("board", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	userId: text("user_id").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
