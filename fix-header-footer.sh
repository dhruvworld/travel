#!/bin/bash

echo "🛠️ Starting header/footer fix..."

# Move Footer.tsx if needed
if [ -f "components/layout/Footer.tsx" ]; then
  echo "📦 Moving Footer.tsx to components/"
  mv components/layout/Footer.tsx components/Footer.tsx
fi

# Move Navbar.tsx if needed
if [ -f "components/layout/Navbar.tsx" ]; then
  echo "📦 Moving Navbar.tsx to components/"
  mv components/layout/Navbar.tsx components/Navbar.tsx
fi

# Remove empty layout directory
if [ -d "components/layout" ] && [ -z "$(ls -A components/layout)" ]; then
  echo "🧹 Removing empty components/layout directory"
  rmdir components/layout
fi

# Fix all import paths across .ts, .tsx, .js, .jsx files
echo "🔍 Rewriting imports across project..."
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i '' 's|@/components/layout/Footer|@/components/Footer|g' {} +
find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i '' 's|@/components/layout/Navbar|@/components/Navbar|g' {} +

# Kill any running Next.js dev server
echo "🔄 Restarting dev server..."
pkill -f "next dev" && sleep 2
npm run dev
