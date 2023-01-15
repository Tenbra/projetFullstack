FROM node:16.13-alpine AS builder

WORKDIR /covid-front
COPY package.json package-lock.json ./
RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build

FROM nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /covid-front/dist/covid-front /usr/share/nginx/html
