FROM node:18.17.1-alpine3.17

WORKDIR /usr/app

COPY package.json package-lock.json ./

RUN npm i

CMD npm run dev