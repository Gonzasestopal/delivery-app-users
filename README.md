# Taco Feliz Users API

- Exposes Users API for our Delivery application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Migrations](#migrations)

## Installation
Clone repo `git clone git@github.com:Gonzasestopal/delivery-app-users.git`

Run `npm install` to install dependencies.

## Usage
- Run `docker-compose up` to run db.
- Run `npm run server` to start the local development server.

## Migrations

- Run `knex migrate:rollback` to reset any previous changes.
- Run `knex migrate:latest` to setup the migration file.
- Run `knex seed:run` to populate the sample seed data.

# API Documentation

## POST  /api/users/

Receives a request body:
```json
{
  "name": "Gonz",
  "password": "123456789",
  "email": "gonzasestopal@gmail.com",
}
```

Returns the created item object:
```json
{
  "message": "Successfully added the item.",
  "item": {
    "id": 1,
    "name": "Gonz",
    "password": "U9PQxzHvkX",
    "email": "gonzasestopal@gmail.com",
    "status": "active",
    "is_admin": false,
    "created_at": null,
    "updated_at": null
  }
}
```

## PUT  /api/users/:id

Receives an existing request parameter ID and a request body:
```json
{
  "name": "sample name UPDATE",
  "password": "sample description UPDATE",
  "email": "cat1 UPDATE",
  "status": "status UPDATE",
  "is_admin": false,
}
```

Returns the updated item object:
```json
{
  "id": 1,
  "name": "sample name UPDATE",
  "password": "sample description UPDATE",
  "email": "cat1 UPDATE",
  "status": "status UPDATE",
  "is_admin": false,
  "created_at": null,
  "updated_at": null
}
```

## DELETE  /api/users/:id

Receives an existing request parameter

Returns a success message:
```json
{
  "message": "Successfully removed the item."
}
```

