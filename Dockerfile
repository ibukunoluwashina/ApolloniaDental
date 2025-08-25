FROM node:14-alpine 
WORKDIR /app
ADD package*.json ./
RUN npm install 
ADD index.js ./
EXPOSE 3000
ENV NAME apolloniadental
CMD ["npm", "start"]

