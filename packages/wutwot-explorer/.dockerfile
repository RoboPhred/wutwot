FROM node:14

COPY package.json .
# We do not have a package-lock because we are a workspace project :(
COPY src .

RUN npm i
RUN npm run build

EXPOSE 6060

ENTRYPOINT [ "npm", "start", "--port=6060" ]