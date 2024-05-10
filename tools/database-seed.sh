#!/bin/bash

export DATABASE_URL="${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public"

if [ "$NODE_ENV" = "production" ]; then
    echo "Ambiente de produção detectado."
    node --env-file .env ./dist/prisma/seed.js
else
    echo "Ambiente de desenvolvimento detectado."
    tsx --env-file .env ./prisma/seed.ts
fi
