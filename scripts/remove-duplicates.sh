#!/bin/bash

echo "Starting duplicate file cleanup..."

# Function to check and remove duplicates
remove_duplicates() {
    local dir="$1"
    local type="$2"
    
    find "$dir" -type f -name "*.js" | while read file; do
        ts_file="${file%.*}.tsx"
        ts_route_file="${file%.*}.ts"
        if [ -f "$ts_file" ] || [ -f "$ts_route_file" ]; then
            rm "$file"
            echo "Removed duplicate: $file"
        fi
    done
}

# Clean pages directory
if [ -d "./pages" ]; then
    remove_duplicates "./pages" "pages"
    remove_duplicates "./pages/api" "api"
fi

# Clean app directory
if [ -d "./app" ]; then
    remove_duplicates "./app" "app"
    remove_duplicates "./app/api" "api"
fi

echo "Cleanup complete!"
