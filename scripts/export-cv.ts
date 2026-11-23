/**
 * Prints the /cv page to public/Azizbek_Tursunov_CV.pdf (A4).
 *
 *   npm run cv:export               build, start on a free port, print, stop
 *   npm run cv:export -- --no-build reuse the existing .next build
 *
 * PORT (default 3166) picks the port; 3100 is left to the e2e server.
 */
import { spawn, spawnSync, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { chromium } from "@playwright/test";
import { PDFDocument } from "pdf-lib";
import { profile } from "../data/profile";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "Azizbek_Tursunov_CV.pdf");
const PORT = Number(process.env.PORT ?? 3166);
const BUILD = !process.argv.includes("--no-build");
const WIN = process.platform === "win32";

function portFree(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.once("error", () => resolve(false));
    srv.once("listening", () => srv.close(() => resolve(true)));
    srv.listen(port);
  });
}

function run(cmd: string, args: string[]) {
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: WIN });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")} exited with ${r.status}`);
}

function stop(child: ChildProcess) {
  if (child.pid === undefined || child.exitCode !== null) return;
  // next start spawns its own node child; kill the whole tree.
  if (WIN) spawnSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  else process.kill(-child.pid, "SIGTERM");
}

async function waitFor(url: string, ms = 60000) {
  const until = Date.now() + ms;
  while (Date.now() < until) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* not up yet */
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`${url} did not respond within ${ms / 1000}s`);
}

async function main() {
  if (!(await portFree(PORT))) throw new Error(`Port ${PORT} is busy; set PORT to a free one.`);
  if (BUILD) {
    // A build over an old .next fails inside OneDrive (readlink EINVAL), so start clean.
    fs.rmSync(path.join(ROOT, ".next"), { recursive: true, force: true });
    run("npm", ["run", "build"]);
  }

  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "ignore",
    shell: WIN,
    detached: !WIN,
  });

  try {
    const url = `http://localhost:${PORT}/cv`;
    await waitFor(url);

    const browser = await chromium.launch();
    try {
      const page = await browser.newPage();
      await page.emulateMedia({ media: "print" });
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true });
      // Chromium leaves author and subject empty; fill the document info.
      const doc = await PDFDocument.load(pdf);
      doc.setTitle(`${profile.name} — CV`);
      doc.setAuthor(profile.name);
      doc.setSubject(profile.title);
      doc.setCreator("azizbektursunov.uz/cv");
      fs.writeFileSync(OUT, await doc.save());
    } finally {
      await browser.close();
    }

    const pages = (await PDFDocument.load(fs.readFileSync(OUT))).getPageCount();
    console.log(`Wrote ${path.relative(ROOT, OUT)} (${pages} page${pages === 1 ? "" : "s"})`);
    if (pages > 2) throw new Error(`The CV runs to ${pages} pages; it must fit on 2.`);
  } finally {
    stop(server);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
