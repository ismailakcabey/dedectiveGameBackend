FROM node:16

# Create app directory, this is in out container
WORKDIR /ismail/src/app


# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# Where available
COPY package*.json ./

RUN npm install --legacy-peer-deps

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

COPY . .

RUN npm run build


EXPOSE 6001
CMD [ "node", "dist/main" ]