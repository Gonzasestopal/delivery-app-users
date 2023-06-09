# Taco Feliz Users API

- Exposes Users API for our Delivery application.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

## Prerequisites

- Make sure you have `https://github.com/Gonzasestopal/delivery-app-db-layer` running.

## Installation

- Run `npm install` to install dependencies.

## Usage

- Run `npm run server` to start the local development server.

## Deployment

- Run `docker build . -t delivery-app-users`

- Deploy image into any provider.

# API Documentation

## POST  /api/users/

Receives a request body:
```json
{
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
    "updated_at": null,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImVtYWlsIjoiYWRtaW5AaG90bWFpbC5jb20iLCJpc19hZG1pbiI6dHJ1ZSwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNjgwNDE0Nzk1LCJleHAiOjE2ODA0MTUwOTV9.ybeYitxeWj_r3s3jtpc8aAgNZfQJda9L23iWsC2LUmY"
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

## PUT /api/users/login

Receives a request body:
```json
{
  "name": "sample name UPDATE",
  "password": "sample description UPDATE",
}

Return a success message with token:
```json
{
    "message": "Successfully logged in.",
    "item": {
        "id": 27,
        "name": "Gonz",
        "email": "admin@hotmail.com",
        "password": "$2a$10$ZMRNAJt7sXU/1S7TVEW/xuVqX1i8phv/3NrSsAXayYHKgEajIub4y",
        "is_admin": true,
        "status": "active",
        "created_at": null,
        "updated_at": null,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjcsImVtYWlsIjoiYWRtaW5AaG90bWFpbC5jb20iLCJpc19hZG1pbiI6dHJ1ZSwic3RhdHVzIjoiYWN0aXZlIiwiaWF0IjoxNjgwNDE0Nzk1LCJleHAiOjE2ODA0MTUwOTV9.ybeYitxeWj_r3s3jtpc8aAgNZfQJda9L23iWsC2LUmY"
    }
}


