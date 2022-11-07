FROM node:lts

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json /usr/src/bot

RUN npm install
COPY . /usr/src/bot
RUN npm run build

CMD [ "npm", "start" ]