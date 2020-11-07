# Having trouble building serialport on alpine

#FROM node:14-alpine as builder
FROM node:14 as builder

WORKDIR /usr/src/app

# We need python for installing @serialport/bindings
#RUN apk add --no-cache python make g++

COPY package.json .
COPY package-lock.json .
# TODO: Copy individual package.json and package.lock
COPY packages packages

# We need npm@7 to install workspace projects, but we need node 12 as serialport cannot handle modern node (tested in 15).
RUN npm i -g npm@7
RUN npm ci

#FROM node:14-alpine
FROM node:14

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
# TODO: When we get builder only dealing with package.json of sub-packages, only copy their node_modules
COPY --from=builder /usr/src/app/packages /usr/src/app/packages

COPY tsconfig.shared.json .
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]