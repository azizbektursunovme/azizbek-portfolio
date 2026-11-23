import os from "node:os";
import path from "node:path";
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  // Outside OneDrive: synced folders lock test-results mid-run.
  outputDir: path.join(os.tmpdir(), "azizbek-portfolio-playwright"),
  webServer: {
    command: "npm run build && npx next start -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180000,
  },
  use: { baseURL: "http://localhost:3100" },
});
