# NodeJS container
FROM node:20-alpine

LABEL version="1.0"
LABEL description="Container to run the frontend application"

# Set the working directory
WORKDIR /usr/src/app

# Copy the python script to the container
COPY public/ ./public
COPY index.js .
COPY package.json .

# Environment variables
ENV APP_PORT = 5000
ENV BACKEND_HOST = localhost
ENV BACKEND_PORT = 5000

# Install the python script dependencies
RUN npm install

# Run the python script
ENTRYPOINT [ "npm", "start" ]

# Expose the port
EXPOSE 5000