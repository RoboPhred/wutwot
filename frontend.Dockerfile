FROM node:10-alpine

WORKDIR /home/node/app

COPY ./packages/homectrl-frontend ./

RUN npm ci
RUN npm run build

USER node

# TODO: Use nginx for this
ENTRYPOINT ["npm", "start", "--", "--host=0.0.0.0", "--port=8081", "--disable-host-check"]