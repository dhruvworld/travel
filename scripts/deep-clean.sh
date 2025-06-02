#!/bin/bash

echo "🧹 Performing deep cleaning of the project..."

# Remove build artifacts
echo "Removing .next directory..."
rm -rf .next

# Remove node_modules
echo "Removing node_modules directory..."
rm -rf node_modules

# Remove package lock files
echo "Removing package lock files..."
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Create or ensure proper .npmrc config
echo "Configuring .npmrc..."
echo "legacy-peer-deps=true" > .npmrc

# Reinstall dependencies
echo "Reinstalling dependencies..."
npm install

# Run build
echo "Building the project..."
npm run build

echo "✅ Clean-up and build complete!"
echo "If successful, you can now run: npm run dev"
