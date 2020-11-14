FROM node:latest

RUN mkdir -p /usr/src/app

COPY package.json index.js .env /usr/src/app/
COPY ./src /usr/src/app/src

WORKDIR /usr/src/app

RUN npm install pm2 -g \
    && npm install

# Set required environment variables
ENV NODE_ENV production

EXPOSE 3000 27017 28017

CMD ["pm2-runtime", "index.js", "-i", "max"]