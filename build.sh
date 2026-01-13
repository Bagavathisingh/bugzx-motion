#!/bin/bash

# Install dependencies at root
pnpm install

# Build packages
pnpm run build

# Navigate to next-demo and build
cd examples/next-demo
pnpm run build
