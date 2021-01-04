FROM node:lts-alpine as node

RUN mkdir -p /app
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build:prod
#--aot --vendor-chunk --common-chunk --delete-output-path --buildOptimizer

FROM nginx:alpine as stage
LABEL APP_ID="phase4-scsb-ui-angular"
RUN rm -rf /usr/share/nginx/html/*
COPY --from=node  /app/dist/phase4-scsb-ui-angular /usr/share/nginx/html
EXPOSE 80
COPY ng.conf /etc/nginx/conf.d/
RUN rm /etc/nginx/conf.d/default.conf
#COPY ./docker-entrypoint.sh /
#RUN chmod +x docker-entrypoint.sh
#ENTRYPOINT ["sh","/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
#COPY nginx.conf /etc/nginx/nginx.conf

## Serve
#CMD ["nginx", "-g", "daemon off;"]