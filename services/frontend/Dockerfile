FROM node:12.18.1
#Set the working directory
WORKDIR /usr/app

# Copy everything in current directory to /server folder
ADD . /server

RUN cd /server; \
    npm install

EXPOSE 3005
CMD ["node", "/server/src/index.js"]
