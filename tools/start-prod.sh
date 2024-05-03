#!/bin/bash
# Script to start the production server
npm run prisma:prep
node --env-file .env ./dist/src/shared/infra/http/server.js
