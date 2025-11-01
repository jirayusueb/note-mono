import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./src/shared/infrastructure/db/schema",
	out: "./src/shared/infrastructure/db/migrations",
	dialect: "sqlite",
	dbCredentials: {
		url: process.env.DATABASE_URL || "./local.db",
	},
});
