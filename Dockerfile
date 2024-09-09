FROM node AS builder

WORKDIR /nodejs

COPY . .

RUN npm install

RUN npm run build

FROM node:alpine

WORKDIR /nodejs

COPY --from=builder /nodejs/build ./build

RUN npm install -g serve

CMD ["serve", "-s", "build"]