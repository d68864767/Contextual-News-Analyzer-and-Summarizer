# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle the application source inside the Docker image
COPY . .

# Make port 5000 available to the outside of the Docker container
EXPOSE 5000

# Define the command to run the application
CMD [ "npm", "start" ]
