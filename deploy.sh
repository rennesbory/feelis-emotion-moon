#!/bin/bash

# Feelis Deployment Script
# This script handles the complete build and deployment process

echo "🚀 Starting Feelis deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Clean previous builds
print_status "Cleaning previous builds..."
rm -rf dist
rm -rf node_modules/.vite

# Step 2: Install dependencies
print_status "Installing dependencies..."
npm ci

if [ $? -ne 0 ]; then
    print_error "Failed to install dependencies"
    exit 1
fi

# Step 3: Build for production
print_status "Building for production..."
NODE_ENV=production npm run build

if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi

# Step 4: Verify video assets
print_status "Verifying video assets..."
video_count=$(find dist -name "*.mp4" -type f | wc -l)
if [ $video_count -eq 0 ]; then
    print_warning "No video files found in dist folder!"
    print_warning "Expected files:"
    ls -la src/assets/videos/
else
    print_status "Found $video_count video files in dist folder"
    find dist -name "*.mp4" -type f
fi

# Step 5: Deploy
print_status "Deploying to GitHub Pages..."
npm run deploy

if [ $? -eq 0 ]; then
    print_status "Deployment completed successfully!"
    print_status "Your site will be available at: https://rennesbory.github.io/feelis-emotion-moon/"
    print_warning "Note: It may take 2-3 minutes for changes to appear"
else
    print_error "Deployment failed"
    exit 1
fi

echo ""
print_status "Deployment Summary:"
echo "- Repository: feelis-emotion-moon"
echo "- Branch: gh-pages"
echo "- URL: https://rennesbory.github.io/feelis-emotion-moon/"
echo "- Video files processed: $video_count"
echo ""
print_warning "If videos still don't load:"
echo "1. Wait 2-3 minutes for GitHub Pages to update"
echo "2. Hard refresh the page (Ctrl+F5)"
echo "3. Check browser console for errors"
echo "4. Check repository Settings > Pages configuration"