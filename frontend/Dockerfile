FROM node:18.12.1-alpine
RUN addgroup dysh && adduser -S -G dysh dysh

USER dysh
WORKDIR /dysh
COPY --chown=dysh:dysh package*.json .
RUN npm install
RUN chown dysh:dysh /dysh
 
COPY --chown=dysh:dysh . .
# web server port
EXPOSE 3000
CMD ["npm","run","start"]
# ENTRYPOINT [ "npm","start" ] the same

# WORKDIR /app
# COPY . /app
# ENV NODE_ENV=production
# RUN npm install --production --silent && mv node_modules ../
# EXPOSE 5000
# USER node
# CMD ["node", "index.js"]
