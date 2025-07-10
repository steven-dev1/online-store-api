FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prisma:generate
RUN npm run prisma:deploy
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]