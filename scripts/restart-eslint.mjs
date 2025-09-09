#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync, rmSync } from "fs";

console.log("🔄 Restarting ESLint...");

// Clean up cache directories
const cacheDirs = [".eslintcache", ".next", "node_modules/.cache"];

cacheDirs.forEach(dir => {
  if (existsSync(dir)) {
    console.log(`🗑️  Removing ${dir}...`);
    rmSync(dir, { recursive: true, force: true });
  }
});

// Clear npm cache
try {
  console.log("🧹 Clearing npm cache...");
  execSync("npm cache clean --force", { stdio: "inherit" });
} catch (error) {
  console.log("⚠️  Failed to clear npm cache:", error.message);
}

// Reinstall dependencies
try {
  console.log("📦 Reinstalling dependencies...");
  execSync("npm install", { stdio: "inherit" });
} catch (error) {
  console.log("⚠️  Failed to reinstall dependencies:", error.message);
}

// Test ESLint
try {
  console.log("✅ Testing ESLint...");
  execSync("npm run lint", { stdio: "inherit" });
  console.log("🎉 ESLint is working correctly!");
} catch (error) {
  console.log("❌ ESLint test failed:", error.message);
  console.log("💡 Please check your configuration and try again.");
}

console.log("✨ Done! Please restart your VSCode to apply all changes.");
