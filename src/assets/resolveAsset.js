// Build-time asset resolver for images in this folder.
// Usage: import { resolveAsset } from "../assets/resolveAsset";
//        <img src={resolveAsset("image1.avif")} />

// Eagerly import all supported images under this directory so Vite rewrites URLs
const assets = import.meta.glob("./*.{png,jpg,jpeg,webp,avif,gif,svg}", { eager: true });

export function resolveAsset(fileName) {
  if (!fileName) return "";
  // normalize: allow full "/src/assets/xxx" or just "xxx"
  const baseName = fileName.replace(/^\/src\/assets\//, "").replace(/^\.\//, "");
  const key = `./${baseName}`;
  const mod = assets[key];
  // Vite returns an object with default export as the URL when eager true
  // In some setups, the value itself is the URL string.
  if (!mod) return "";
  return typeof mod === "string" ? mod : mod.default || "";
}


