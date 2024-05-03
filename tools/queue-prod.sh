#!/bin/bash
# Script to start the queue production server
node --env-file .env ./src/shared/infra/queue/index.js