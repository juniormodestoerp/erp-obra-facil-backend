#!/bin/bash -x

export DATABASE_URL="${DB_CONNECTION}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}?schema=public"

node -e "require('fs').existsSync('.env') || require('fs').copyFileSync('.env.example', '.env')"