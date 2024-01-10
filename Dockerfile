FROM node:18-alpine as build

WORKDIR /usr/app
COPY . /usr/app
RUN npm i
RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 80

COPY --from=build /usr/app/built /usr/share/nginx/html