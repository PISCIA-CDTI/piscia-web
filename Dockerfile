FROM node:alpine

WORKDIR /imaqua/frontend

COPY water-middleware-eye/package.json ./

RUN npm install

COPY  water-middleware-eye ./

CMD ["npm", "run", "start"]