# Use Node v11.2 as the base image.
FROM node:11.2.0-alpine

#Set the working directory
WORKDIR /usr/app

# Copy everything in current directory to /server folder
ADD . /server

# Install dependencies
RUN cd /server; \
    npm install

# Run node 
CMD ["node", "/server/src/server.js"]