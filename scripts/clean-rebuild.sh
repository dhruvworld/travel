#!/bin/bash

echo "🧹 Cleaning up build artifacts and node modules..."
rm -rf .next
rm -rf node_modules
rm -f package-lock.json

echo "📦 Reinstalling dependencies..."
npm install

echo "⚙️ Creating optimal .npmrc configuration..."
echo "legacy-peer-deps=true" > .npmrc

echo "✅ Clean-up complete! Now run: npm run dev"
