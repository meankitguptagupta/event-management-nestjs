FROM node:22-alpine3.19

# Install git and any other dependencies
RUN apk add --no-cache git

EXPOSE 3000

WORKDIR /home/code

COPY . .