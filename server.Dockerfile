FROM node:10-alpine

WORKDIR /home/node/app

# Ideally this would be done in a build container, but we cannot copy the symlinks produced by lerna install
RUN apk add --no-cache make gcc g++ python linux-headers udev openzwave openzwave-dev

COPY ./packages/homectrl-moziot ./packages/homectrl-moziot
COPY ./packages/homectrl-plugin-test ./packages/homectrl-plugin-test
COPY ./packages/homectrl-plugin-zwave ./packages/homectrl-plugin-zwave
COPY ./packages/homectrl-server ./packages/homectrl-server
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./lerna.json ./lerna.json

RUN npm ci
RUN npm run lerna bootstrap
RUN npm run build

USER node

ENTRYPOINT ["node", "./packages/homectrl-server/lib/index.js"]