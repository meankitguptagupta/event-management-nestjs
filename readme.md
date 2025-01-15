# Event Management Application Setup

This repository contains the setup and configuration for the **Event Management** application, which consists of a backend, frontend, MySQL database, and an Adminer for database management. This guide will help you set up and run the application using Docker.

## Prerequisites

Ensure that the following tools are installed on your system:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)
- Yarn (optional, if you're working on the frontend or backend separately): [Install Yarn](https://yarnpkg.com/getting-started/install)

## Project Structure

The project is organized as follows:

. ├── backend/ # Backend application (event management API) ├── frontend/ # Frontend application (React app) ├── mysql/ # MySQL data volume (persisted data) ├── Dockerfile # Dockerfile for building Node.js image ├── docker-compose.yml # Docker Compose configuration for services ├── setup.sh # Shell script for building images and installing dependencies └── README.md # This file

bash
Copy code

## Setup and Installation

### Step 1: Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-repository/event-management.git
cd event-management
Step 2: Build the Docker image
The Dockerfile specifies a Node.js image (node:22-alpine3.19) and is used to build a custom image (node22). To build the image, run the following command:

bash
Copy code
sh setup.sh
This script will:

Build the Docker image (node22) without using cache to ensure that all dependencies are freshly installed.
Install the backend and frontend dependencies by running yarn install in their respective containers.
Step 3: Start the services
Once the image is built, Docker Compose will automatically start the following services:

Backend (event_management): Runs the backend API on port 3000.
Frontend (event_management_frontend): Runs the React app on port 3001.
MySQL: A MySQL container running on the default port 3306.
Adminer: A web-based database management tool accessible on port 8080.
To start the services, run:

bash
Copy code
docker-compose up
This will start all the containers and set up the necessary network to allow communication between them.

Step 4: Access the services
Backend API: http://localhost:3000
Frontend React App: http://localhost:3001
Adminer (Database Management): http://localhost:8080
Login with the following credentials:
System: mysql
Username: development
Password: development
Database: events
Step 5: Stop the services
To stop the running containers, you can use:

bash
Copy code
docker-compose down
This will stop and remove the containers, networks, and volumes. If you want to stop the containers but keep the data, you can use:

bash
Copy code
docker-compose stop
Troubleshooting
1. permission denied error during build
If you encounter a permission denied error (such as open mysql/#innodb_redo: permission denied), it might be due to file permissions. To resolve this, run:

bash
Copy code
sudo chown -R $USER:$USER ./mysql
2. node22 image not found
If the node22 image is not found during docker-compose up, it indicates that the image hasn't been built properly. Make sure that the docker build command has completed successfully before running Docker Compose. You can check the local images with:

bash
Copy code
docker images
3. Docker Compose version issues
If you encounter issues with Docker Compose commands, ensure that you're using a compatible version. Some older Docker Compose versions may not support docker compose (with a space) as a command. You can check your version with:

bash
Copy code
docker-compose --version
If you're using Docker Compose V2 (with a space), try the following:

bash
Copy code
docker compose up
If you're using an older version of Docker Compose, you may need to use:

bash
Copy code
docker-compose up
License
This project is licensed under the MIT License - see the LICENSE file for details.

markdown
Copy code

---

### Explanation of the file contents:

- **Project Overview**: An introduction to what the repository and services are about.
- **Prerequisites**: Details about the necessary tools and their installation links.
- **Project Structure**: An overview of the directory structure, helping users understand where different parts of the project are located.
- **Setup and Installation**: Instructions on how to clone the repository, build the Docker image, start the Docker containers, and access the services.
- **Troubleshooting**: Common errors and their solutions (file permissions, Docker image issues, and Compose version problems).
- **License**: A placeholder for the project license.

This file should serve as a complete guide to help others (or future you) set up and run this project with Docker.