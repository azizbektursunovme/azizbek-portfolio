import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const DESK = "C:/Users/group/OneDrive/Desktop/";
const OUT = path.join(process.cwd(), "public", "work");
const MAX = 4 * 1024 * 1024;

const jobs: { input: string; out: string }[] = [
  { input: DESK + "GoodIdeaCargo_OwnerOperator_Ad_9x16.mp4", out: "good-idea-cargo-ads/ad-a1-9x16.mp4" },
  { input: DESK + "GoodIdeaCargo_OwnerOperator_Ad_4x5.mp4", out: "good-idea-cargo-ads/ad-a1-4x5.mp4" },
  { input: DESK + "GoodIdeaCargo_A2_88math_v2_9x16.mp4", out: "good-idea-cargo-ads/ad-a2-9x16.mp4" },
  { input: "C:/Users/group/Downloads/GFS_OwnerOperator_Ad_v3_9x16.mp4", out: "gfs-ads/ad-gfs-9x16.mp4" },
];

function ff(args: string[]) {
  if (!ffmpegPath) throw new Error("ffmpeg-static is an optional dependency and is not installed; run npm install ffmpeg-static first.");
  const r = spawnSync(ffmpegPath, ["-y", "-loglevel", "error", ...args], { encoding: "utf8" });
  if (r.status !== 0) throw new Error(r.stderr);
}

for (const { input, out } of jobs) {
  const dst = path.join(OUT, out);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  let crf = 28;
  for (;;) {
    ff([
      "-i", input, "-an",
      "-vf", "scale='min(720,iw)':-2",
      "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-pix_fmt", "yuv420p",
      "-movflags", "+faststart", dst,
    ]);
    const size = fs.statSync(dst).size;
    console.log(`${out} crf=${crf} ${(size / 1024 / 1024).toFixed(2)}MB`);
    if (size <= MAX || crf >= 45) break;
    crf += 2;
  }
  ff(["-i", dst, "-frames:v", "1", "-q:v", "3", dst.replace(/\.mp4$/, ".jpg").replace(/ad-/, "ad-")]);
}
