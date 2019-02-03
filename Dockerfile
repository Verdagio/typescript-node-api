FROM node:latest

# app directory
WORKDIR /home/node/app

# install application dependencies
COPY package*.json ./

RUN npm install

# bundle app source
COPY . .

# bind application to port 9000
EXPOSE 9000

CMD [ "npm", "run", "prod" ]


