#!/usr/bin/env bash

# Uncomment below 2 lines if nvm is not installed.
# curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 10.15.1
nvm use 10.15.1
npm install yarn -g

# Client
cd ./../client/
yarn install --production=false
CI=true npm run test
npm run build

# Server
cd ./../server/
yarn install --production=false
npm run compile
NODE_ENV=staging npm run test

