FROM node:18.12.1

WORKDIR /var/www

EXPOSE 3000

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "start"]
