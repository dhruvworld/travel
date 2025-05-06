// scripts/migrate-to-firebase.ts
import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

function migrateToFirebase() {
  console.log('🧹 Removing Prisma packages...')
  execSync('npm uninstall @prisma/client prisma @auth/prisma-adapter', { stdio: 'inherit' })

  console.log('🛠 Installing Firebase SDKs...')
  execSync('npm install firebase firebase-admin', { stdio: 'inherit' })

  const prismaDir = path.resolve('prisma')
  if (fs.existsSync(prismaDir)) {
    fs.rmSync(prismaDir, { recursive: true, force: true })
    console.log('🗑️ Removed prisma/ directory')
  }

  const envPath = path.resolve('.env.local')
  if (fs.existsSync(envPath)) {
    let contents = fs.readFileSync(envPath, 'utf-8')
    // remove any PRISMA_* or DATABASE_URL lines
    contents = contents
      .split('\n')
      .filter(line => !/^PRISMA_|^DATABASE_URL/.test(line))
      .join('\n')
    fs.writeFileSync(envPath, contents)
    console.log('🧹 Cleaned up .env.local')
  }

  console.log('✅ Migration to Firebase complete.')
}

if (require.main === module) {
  migrateToFirebase()
}
