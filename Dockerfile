FROM node:16

#Create app directory
WORKDIR /usr/src/app

#Install app dependencies 
# A wildcard is used to ensure both the package.json and package-lock.json are copied

COPY package*.json ./

ARG NODE_ENV

RUN if [ "${NODE_ENV}" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi
COPY . .

EXPOSE 3000

CMD ["npm", "run","dev"]

