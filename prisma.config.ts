import { defineConfig } from "prisma/config";
import path from "node:path";

export default defineConfig({
	schema: path.join(process.cwd(), "prisma", "schema.prisma"),
	migrations: {
		seed: "tsx prisma/seed.ts",
	},
});