import fs from "fs";
import { dirname, join } from "path";
import semver from "semver";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = JSON.parse(
  fs.readFileSync(join(__dirname, "../package.json"), "utf8")
);
const { dependencies, devDependencies } = pkg;

const eslintVersion = devDependencies["eslint"] || dependencies["eslint"];
const tsEslintVersion =
  devDependencies["@typescript-eslint/eslint-plugin"] ||
  dependencies["@typescript-eslint/eslint-plugin"];

if (!eslintVersion || !tsEslintVersion) {
  console.error(
    "❌ eslint atau @typescript-eslint/eslint-plugin belum terdefinisi di package.json."
  );
  process.exit(1);
}

// Versi yang sesuai dengan dokumen: https://typescript-eslint.io
const requiredEslintRange = "^8.57.0";
const installedEslint = semver.coerce(eslintVersion);
const isValid = semver.satisfies(installedEslint, requiredEslintRange);

if (!isValid) {
  console.error(
    `❌ Versi eslint (${eslintVersion}) tidak cocok dengan yang didukung oleh @typescript-eslint (${requiredEslintRange})`
  );
  process.exit(1);
} else {
  console.log(
    `✅ eslint (${eslintVersion}) kompatibel dengan @typescript-eslint (${tsEslintVersion})`
  );
}
