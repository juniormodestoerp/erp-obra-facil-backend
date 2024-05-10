#!/bin/bash -xe

export DATABASE_URL="${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public"

#
# Prepara o banco de dados
#
npm run prisma:prep

#
# Inicia a aplicação com as variáveis de ambiente já carregadas.
#
tsx watch --env-file .env ./src/shared/infra/http/server.ts
