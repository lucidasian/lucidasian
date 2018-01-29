# Use Node v8 as the base image.
FROM node:8

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /client

# Change working directory to /app
WORKDIR /client

# install all dependencies
RUN npm install