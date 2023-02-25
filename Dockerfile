FROM node:18.13.0-alpine3.17 as base

# Create Directory for the Container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json /

# Expose API Port
EXPOSE 3000

# ---------------------- START DEVELOPMENT CONFIGURATION -----------------------
FROM base as development
ENV NODE_ENV development

# Copy all other source code to work directory
COPY --chown=node:node . .

# Run npm and install modules
RUN npm i

USER node

# Run start development command
CMD ["npm", "run", "start:dev"]
# ----------------------- END DEVELOPMENT CONFIGURATION ------------------------

# ----------------------- START PRODUCTION CONFIGURATION -----------------------
FROM base as production
ENV NODE_ENV production

# Copy all other source code to work directory
COPY --chown=node:node . .

# Run npm and install production modules
RUN npm ci --only=production

USER node

# Run start production command
CMD ["node", "bin/www/index.js"]
# ------------------------ END PRODUCTION CONFIGURATION ------------------------
