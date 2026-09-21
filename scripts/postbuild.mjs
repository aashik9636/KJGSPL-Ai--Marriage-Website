import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "out");
const distDir = path.resolve(process.cwd(), "dist");

if (fs.existsSync(outDir)) {
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.cpSync(outDir, distDir, { recursive: true });
  console.log("✓ Successfully created 'dist' directory from 'out' for hosting providers.");
}
