FROM node:8

ADD ./ /usr/local
WORKDIR /usr/local

RUN npm install
RUN npm install -g serve
RUN npm run build

EXPOSE 3000

CMD ["serve", "-l", "3000", "build"]
