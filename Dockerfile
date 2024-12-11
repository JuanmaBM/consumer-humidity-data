FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run

EXPOSE 8080

CMD [ "npm", "start" ]