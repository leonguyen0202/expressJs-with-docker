# install latest node
# https://hub.docker.com/_/node/
FROM node:latest

# create and set app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# install app dependencies
# this is done before the following COPY command to take advantage of layer caching
COPY package.json .
RUN npm install
RUN npm update
RUN npm install -g npm

# copy app source to destination container
COPY . .

ARG DOCKER_PORT=${DOCKER_PORT}

# expose container port
EXPOSE ${DOCKER_PORT}

CMD ["npm", "start"]
