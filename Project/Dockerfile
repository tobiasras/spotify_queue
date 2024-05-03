FROM node:20.11.0 AS client-build

LABEL authors="tobia"
ENTRYPOINT ["top", "-b"]

WORKDIR /client

COPY ../client/package.json ./
RUN npm install

COPY ../client ./
RUN npm run build

FROM node:20.11.0
WORKDIR /server
COPY --from=client-build /client/build /client/build
COPY ../server/package.json ./

RUN apt-get update && \
    apt-get install -y make gcc g++ python3 python3-pip && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apt-get remove -y make gcc g++ python3 python3-pip && apt-get autoremove -y && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY ../server ./

EXPOSE 8080
ENV NODE_ENV=production

CMD ["node", "/server/app.js"]






