FROM node:carbon-slim

# Create app directory
WORKDIR /git/graph_api

# Install app dependencies
COPY package.json /git/graph_api
RUN npm install

# Bundle app source
COPY . /git/graph_api
RUN npm run prepublish

EXPOSE 5000

CMD [ "npm", "run", "runServer" ]
