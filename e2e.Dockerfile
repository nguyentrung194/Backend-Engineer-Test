FROM node:18.18.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x wait-for-it.sh
COPY ./wait-for-it.sh /opt/wait-for-it.sh
RUN chmod +x startup.ci.sh
RUN sed -i 's/\r//g' wait-for-it.sh
RUN sed -i 's/\r//g' startup.ci.sh

WORKDIR /app

RUN if [ ! -f .env ]; then cp env-example .env; fi
RUN npm run build

RUN apk add --no-cache bash
CMD ["/bin/bash", "startup.ci.sh"]
