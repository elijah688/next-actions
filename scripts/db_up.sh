#!/bin/bash

set -e 

echo "Starting the database..."
docker-compose -f db.yaml up -d pg

echo "Waiting for the database to be ready..."
until docker exec pg pg_isready -U postgres -h localhost -p 5432; do
  echo "Database is not ready yet. Retrying in 1 seconds..."
  sleep 1
done
echo "Database is online!"

SQL_FILE="./templates/notes.sql"
if [ -f "$SQL_FILE" ]; then
  echo "Applying SQL script: $SQL_FILE"
  docker exec -i pg psql -U postgres -d notes < "$SQL_FILE"
  echo "SQL script applied successfully."
else
  echo "SQL file not found at $SQL_FILE. Exiting."
  exit 1
fi

echo "Database setup complete!"

