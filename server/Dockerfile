# Use Node v8 as the base image.
FROM node:8

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /server

# Change working directory to /app
WORKDIR /server

# install all dependencies
RUN npm install