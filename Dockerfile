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
#COPY ng.conf /etc/nginx/conf.d/
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx.conf /etc/nginx/nginx.conf

## Serve
#CMD ["nginx", "-g", "daemon off;"]