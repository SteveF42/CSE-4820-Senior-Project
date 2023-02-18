FROM node:18.12.1-alpine
ENV MONGODB_URL=mongodb://host.docker.internal:27017/dysh
RUN addgroup dysh && adduser -S -G dysh dysh
USER dysh

WORKDIR /dysh
RUN mkdir data

COPY --chown=dysh:dysh package*.json .
RUN npm install

COPY --chown=dysh:dysh . .
# web server port
EXPOSE 5000
# mongoDB port
EXPOSE 27017
CMD ["npm","run","start"]
# ENTRYPOINT [ "npm","start" ] the same

# WORKDIR /app
# COPY . /app
# ENV NODE_ENV=production
# RUN npm install --production --silent && mv node_modules ../
# EXPOSE 5000
# USER node
# CMD ["node", "index.js"]
