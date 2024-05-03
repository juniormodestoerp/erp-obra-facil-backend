#!/bin/bash

VERSION=`cat package.json | jq -r '.version' | tr -d '[:space:]'`

sed -i.bak 's/DB_HOST=postgres/DB_HOST=localhost/g' .env.example && rm .env.example.bak
sed -i.bak 's/REDIS_HOST=redis/REDIS_HOST=localhost/g' .env.example && rm .env.example.bak