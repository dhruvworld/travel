// scripts/migrate-to-firebase.ts
import fs from "fs";
import { execSync } from "child_process";
import path from "path";

// 1. Uninstall Prisma-related packages
console.log("🧹 Removing Prisma packages...");
execSync("npm uninstall @prisma/client prisma @auth/prisma-adapter", { stdio: "inherit" });

// 2. Install Firebase SDK
console.log("📦 Installing Firebase SDK...");
execSync("npm install firebase", { stdio: "inherit" });

// 3. Remove prisma directory
const prismaDir = path.resolve("prisma");
if (fs.existsSync(prismaDir)) {
  fs.rmSync(prismaDir, { recursive: true, force: true });
  console.log("🗑️ Removed prisma/ directory");
}

// 4. Clean up .env.local
const envPath = path.resolve(".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  const cleaned = content
    .split("\n")
    .filter(line => !line.startsWith("DATABASE_URL"))
    .join("\n");
  fs.writeFileSync(envPath, cleaned);
  console.log("✅ Cleaned DATABASE_URL from .env.local");
}

// 5. Write Firebase config
const firebaseConfigPath = path.resolve("firebaseConfig.ts");
fs.writeFileSync(
  firebaseConfigPath,
  `// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);`
);
console.log("⚙️ Created firebaseConfig.ts");

// 6. Write firebase.json
fs.writeFileSync(
  "firebase.json",
  `{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}`
);

// 7. Write .firebaserc
fs.writeFileSync(
  ".firebaserc",
  `{
  "projects": {
    "default": "your-project-id"
  }
}`
);

console.log("🚀 Firebase migration setup completed!");
