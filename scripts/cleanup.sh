#!/bin/bash

echo "Cleaning up duplicate files..."

# Function to check and remove .js file if .tsx exists
check_and_remove() {
  local js_file="$1"
  local tsx_file="${js_file%.*}.tsx"
  local ts_file="${js_file%.*}.ts"
  
  if [ -f "$tsx_file" ] || [ -f "$ts_file" ]; then
    rm -f "$js_file"
    echo "Removed duplicate: $js_file"
  fi
}

# Recursively find and process all .js files in app/ and pages/
find ./app ./pages -type f -name "*.js" | while read file; do
  check_and_remove "$file"
done

echo "Cleanup complete!"
