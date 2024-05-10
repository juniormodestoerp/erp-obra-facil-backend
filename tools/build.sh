#!/bin/bash

# Script to build the project
echo "Starting build process..."
tsup --config tsup.config.ts
echo "Build process finished."