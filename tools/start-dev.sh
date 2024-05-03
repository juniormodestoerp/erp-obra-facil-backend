#!/bin/bash
# Script to start the development server
npm run prisma:prep
tsx watch --env-file .env ./src/shared/infra/http/server.ts