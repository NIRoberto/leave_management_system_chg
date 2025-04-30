# Step 1: Build the React app in a Node.js container
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all other source files to the container
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the app using Nginx in a lightweight container
FROM nginx:alpine

# Copy the built app from the previous stage to the nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]
