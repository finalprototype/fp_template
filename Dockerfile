FROM node:12.18.2-buster

ARG PORT
ARG PORT_ASSETS
ARG REPO_SHORT_NAME

RUN apt-get update && \
    apt-get upgrade --yes && \
    apt-get install --yes --no-install-recommends \
        libgl1 libxi6 libgconf-2-4

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --loglevel=error --progress=false

COPY . .
