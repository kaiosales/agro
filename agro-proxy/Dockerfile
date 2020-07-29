
############### STAGE 1: Build
FROM node:12.18.2-alpine3.9 AS build
WORKDIR /app

COPY page/package.json page/package-lock.json ./
COPY server/nginx.conf ./
RUN npm install
COPY ./page .
RUN npm run build:prod

############### STAGE 2: Run
FROM nginx:1.19.1-alpine

COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
