const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Delete prisma generated files
console.log('Deleting Prisma generated files...')
try {
  if (fs.existsSync(path.join(__dirname, '../node_modules/.prisma'))) {
    fs.rmSync(path.join(__dirname, '../node_modules/.prisma'), { recursive: true, force: true })
  }
  
  if (fs.existsSync(path.join(__dirname, '../node_modules/@prisma/client'))) {
    fs.rmSync(path.join(__dirname, '../node_modules/@prisma/client'), { recursive: true, force: true })
  }
  
  console.log('Prisma files deleted successfully.')
} catch (error) {
  console.error('Error deleting Prisma files:', error)
}

// Run prisma generate
console.log('Regenerating Prisma client...')
try {
  execSync('npx prisma generate', { stdio: 'inherit' })
  console.log('Prisma client regenerated successfully.')
} catch (error) {
  console.error('Error regenerating Prisma client:', error)
}
