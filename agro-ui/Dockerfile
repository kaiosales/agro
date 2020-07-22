
############### STAGE 1: Build
FROM node:12.18.2-alpine3.9 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:prod


############### STAGE 2: Run
FROM node:12.18-alpine
RUN npm install express

COPY --from=build /app/dist/agro ./dist/agro
COPY --from=build /app/server.js ./

ENV PORT 3001

EXPOSE ${PORT}
ENTRYPOINT [ "node", "server.js" ]