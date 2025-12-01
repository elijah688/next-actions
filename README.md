# Next.js Notes CRUD App

A containerized Next.js CRUD app for managing notes.  
Each note contains a `title`, `content`, and an `updated_at` timestamp.  
Backed by PostgreSQL database.
---

## Features

- Create, read, update, delete notes
- Pagination support
- Server Actions (`"use server"`)
- PostgreSQL storage with upsert logic
- Dockerized Next.js app and PostgreSQL setup
- Sample data generator (100 notes)

---

## Tech Stack

- **Next.js 15+ (App Router)**
- **TypeScript**
- **PostgreSQL**
- **node-postgres (pg)**
- **Docker + Docker Compose**

---

## Environment Variables

Create `.env.production`:

```

DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=notes
DB_PASSWORD=pass
DB_PORT=6969

````

---

## Database Schema (notes.sql)

```sql
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
````

---

## CRUD Logic Summary

### Get notes (paginated)

```ts
GetNotes(limit, offset)
```

### Get note by ID

```ts
GetnoteByID(id)
```

### Create or update note (upsert)

```ts
UpsertNote(note)
```

### Delete note

```ts
DeleteByID(id)
```

### Form action

```ts
export async function formAction(id, formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  await UpsertNote({ id, title, content, updated_at: new Date() });
  redirect("/");
}
```

---

## Running With Docker

### Start + Build

```sh
make run
```

### Start database + apply schema

```sh
make db_up
```

This executes:

* `scripts/db_up.sh` → boot PG container + load SQL
* `scripts/ins.sh` → insert 100 random notes

---

## Dockerfile Overview

* Multi-stage build:

  1. **builder** → installs dependencies + builds Next.js
  2. **runner** → uses `.next/standalone` for minimal runtime image

---

## API Notes

The database wrapper uses parameterized queries and a small typed abstraction:

```ts
db.getPaginatedNotes(limit, offset)
db.getNoteById(id)
db.upsertNote(note)
db.deleteNoteByID(id)
```

---

## Makefile Targets

```sh
make run      # build + start everything
make db_up    # start db + apply schema + seed data
```

---

## Docker Compose

Runs the Next.js runtime container and PostgreSQL.

Ports:

* Next.js: `3000`
* PostgreSQL: `6969`
