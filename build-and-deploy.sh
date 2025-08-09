#!/bin/bash

# Clean previous build
rm -rf dist

# Build for production
NODE_ENV=production npm run build

# Deploy to GitHub Pages
npm run deploy