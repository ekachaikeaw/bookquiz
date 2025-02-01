
FROM node:16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY ./src ./

EXPOSE 3000

CMD ["npm", "run", "dev"]
        