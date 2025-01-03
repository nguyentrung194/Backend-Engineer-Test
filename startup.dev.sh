#!/bin/bash
set -e

/opt/wait-for-it.sh db_postgres:5432
npm run migration:generate -- src/database/migrations/Init || true
npm run migration:run
npm run seed:run
npm run start:prod
