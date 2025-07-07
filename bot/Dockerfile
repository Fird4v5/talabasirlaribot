FROM node:20

WORKDIR /app
COPY . .

RUN npm install

CMD ["npx", "ts-node", "src/index.ts"]