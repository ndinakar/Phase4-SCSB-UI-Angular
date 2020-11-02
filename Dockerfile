FROM node:lts-alpine as node

RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine as stage
COPY --from=node  /app/dist/phase4-scsb-ui-angular /usr/share/nginx/html
EXPOSE 80