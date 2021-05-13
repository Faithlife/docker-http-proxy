FROM node:16-alpine

WORKDIR /opt/proxy
COPY package.json yarn.lock ./
RUN yarn
COPY index.js ./

CMD [ "node", "index.js" ]
