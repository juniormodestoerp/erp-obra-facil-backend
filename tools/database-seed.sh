#!/bin/bash
# Script to handle database seeders based on environment

# Verifica se o ambiente é de production
if [ "$NODE_ENV" = "production" ]; then
    echo "Ambiente de produção detectado."
    node --env-file .env ./prisma/seed.js
else
    echo "Ambiente de desenvolvimento detectado."
    tsx --env-file .env ./prisma/seed.ts
fi
