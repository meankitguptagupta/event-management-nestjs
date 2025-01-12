#!/bin/sh

# Build the Docker image
echo "Building Docker image..."
docker build -t node22 . --no-cache

# Use docker-compose run to create a temporary container to install dependencies
echo "Installing dependencies inside the container..."
# docker compose run --rm event_management yarn install
