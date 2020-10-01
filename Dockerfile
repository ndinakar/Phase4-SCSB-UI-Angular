FROM node:latest as build-step

RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.16.0-alpine as prod-stage
COPY --from=build-step  /app/dist/phase4-scsb-ui-angular /usr/share/nginx/html
EXPOSE 80