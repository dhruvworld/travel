#!/bin/bash

# Exit on any error
set -e

echo "🔧 Fixing PrismaAdapter issue in Next.js 14 + next-auth..."

# Path to your auth options file (adjust if needed)
AUTH_FILE="./lib/auth-options.ts"

# Ensure file exists
if [ ! -f "$AUTH_FILE" ]; then
  echo "❌ ERROR: $AUTH_FILE not found. Please adjust the script path."
  exit 1
fi

# Check and insert PrismaAdapter import if missing
if ! grep -q "PrismaAdapter" "$AUTH_FILE"; then
  echo "🔁 Adding PrismaAdapter import..."
  sed -i '' '1s|^|import { PrismaAdapter } from "@auth/prisma-adapter";\n|' "$AUTH_FILE"
else
  echo "✅ PrismaAdapter already imported."
fi

# Add prisma import if missing
if ! grep -q "import prisma" "$AUTH_FILE"; then
  echo "🔁 Adding Prisma client import..."
  sed -i '' '1s|^|import { prisma } from "@/lib/prisma";\n|' "$AUTH_FILE"
else
  echo "✅ Prisma client already imported."
fi

echo "✅ All auth imports updated successfully in $AUTH_FILE"
