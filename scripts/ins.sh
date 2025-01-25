#!/bin/bash

export PGPASSWORD=pass
DB_USER="postgres"
DB_NAME="notes"
DB_HOST="localhost"
DB_PORT="6969"

VALUES=""

for i in {1..100}; do
  TITLE="Random Title $i"
  CONTENT="This is a randomly generated content for card $i. The quick brown fox jumps over the lazy dog."

  RANDOM_DAYS=$((RANDOM % 30))
  UPDATED_AT=$(date -v-"$RANDOM_DAYS"d +%Y-%m-%dT%H:%M:%S)

  VALUES+="('$TITLE', '$CONTENT', '$UPDATED_AT'),"
done

VALUES=${VALUES%,}

psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -c "
  INSERT INTO notes (title, content, updated_at)
  VALUES $VALUES;
"

echo "Inserted 100 random cards into the notes table with a single query."
