import os from "node:os";
import path from "node:path";
import { defineConfig } from "@playwright/test";

const PORT = process.env.PORT ?? "3100";
export default defineConfig({
  testDir: "e2e",
  // Outside OneDrive: synced folders lock test-results mid-run.
  outputDir: path.join(os.tmpdir(), "azizbek-portfolio-playwright"),
  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
  },
  use: { baseURL: `http://localhost:${PORT}` },
});
