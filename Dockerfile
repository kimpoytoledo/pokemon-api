# Use the official Node.js 14 base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package*.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy other files to the working directory
COPY . .

# Build the application
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
