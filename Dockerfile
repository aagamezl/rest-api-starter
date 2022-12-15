FROM node:18.12.1-alpine3.16 as base

# Create Directory for the Container
WORKDIR /usr/src/app

# RUN chown -Rh node:node /usr/src/app

# USER node

COPY package*.json /
EXPOSE 3001

# ---------------------- START DEVELOPMENT CONFIGURATION -----------------------
FROM base as development
ENV NODE_ENV=development

# Run npm and install modules
RUN npm i

# Copy all other source code to work directory
COPY . /

# Run start command
CMD ["npm", "run", "start:dev"]
# ----------------------- END DEVELOPMENT CONFIGURATION ------------------------

# ----------------------- START PRODUCTION CONFIGURATION -----------------------
FROM base as production
ENV NODE_ENV=production

# Run npm and install production modules
RUN npm ci

# Copy all other source code to work directory
COPY . /

# Run start command
CMD ["node", "bin/www/index.js"]
# ------------------------ END PRODUCTION CONFIGURATION ------------------------
