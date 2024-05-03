#!/bin/bash
# Script to copy files the project
cp -r src/uploads dist/src/uploads

# Verifica se o arquivo .env existe, se não, copia de .env.example
if [ "$NODE_ENV" = "production" ]; then
    echo "Ambiente de produção detectado."
    node -e "require('fs').existsSync('dist/.env') || require('fs').copyFileSync('.env.example', 'dist/.env')"
else
    echo "Ambiente de desenvolvimento detectado."
    node -e "require('fs').existsSync('.env') || require('fs').copyFileSync('.env.example', '.env')"
fi