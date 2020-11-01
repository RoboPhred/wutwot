FROM node:12

RUN npm i -g npm@7

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY packages packages

RUN npm install

COPY tsconfig.shared.json .
RUN npm run build

# TODO: Cleanup npm artifacts.

ENTRYPOINT [ "npm", "run", "start" ]