FROM node:19.6.1
WORKDIR /app
COPY . /app/
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm","start"]
