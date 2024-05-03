#!/bin/bash
# Script to start the queue development server
tsx watch --env-file .env ./src/shared/infra/queue/index.ts