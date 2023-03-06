FROM node
WORKDIR /app
COPY package.json .
# RUN npm i -g expo eas-cli
ENV EAS_PROJECT_ROOT /app
ENV CHOKIDAR_USEPOLLING true
ENV EAS_NO_VCS 1
RUN npm i
