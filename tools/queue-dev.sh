#!/bin/bash

export DATABASE_URL="${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public"

tsx watch --env-file .env ./src/shared/infra/queue/index.ts