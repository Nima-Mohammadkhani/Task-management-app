# Task Manager API - Backend

A RESTful API for task management built with NestJS and PostgreSQL.

---

## Features

- CRUD operations for task management
- PostgreSQL database with Docker support
- Interactive API documentation (Swagger UI)
- Request validation with class-validator
- TypeScript for type safety

---

## API Endpoints

| Method | Endpoint     | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/tasks`     | Create a new task |
| GET    | `/tasks`     | Get all tasks     |
| GET    | `/tasks/:id` | Get a single task |
| PATCH  | `/tasks/:id` | Update a task     |
| DELETE | `/tasks/:id` | Delete a task     |

---

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (optional, for PostgreSQL)

### Step 1: Install dependencies

```bash
npm install
```

````

### Step 2: Start PostgreSQL with Docker

```bash
docker run --name task-postgres \
  -e POSTGRES_PASSWORD=mysecretpassword \
  -e POSTGRES_DB=tasks_db \
  -p 5432:5432 \
  -d postgres
```

### Alternative (without Docker)

Install PostgreSQL manually and create a database named `tasks_db`.
Update the connection settings in `app.module.ts` if needed.

### Step 3: Start the server

```bash
npm run start:dev
```

Expected output:

```
Server running on http://localhost:3000
Swagger UI: http://localhost:3000/api-docs
```

---

## Testing the API

### Create a task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn NestJS", "description": "Build something cool"}'
```

### Get all tasks

```bash
curl http://localhost:3000/tasks
```

### Update a task

```bash
curl -X PATCH http://localhost:3000/tasks/{task-id} \
  -H "Content-Type: application/json" \
  -d '{"isDone": true}'
```

### Delete a task

```bash
curl -X DELETE http://localhost:3000/tasks/{task-id}
```

---

## API Documentation (Swagger)

Once the server is running, navigate to:

```
http://localhost:3000/api-docs
```

The Swagger UI allows you to explore and test all endpoints directly from the browser.

---

## Environment Variables (Optional)

Create a `.env` file in the root directory:

```env
DB_PASSWORD=mysecretpassword
PORT=3000
```

Default values work without this file.

---

## Project Structure

```
back-end/
├── src/
│   ├── tasks/
│   │   ├── dto/              # Request validation
│   │   ├── task.entity.ts    # Database schema
│   │   ├── tasks.service.ts  # Business logic
│   │   ├── tasks.controller.ts # API routes
│   │   └── tasks.module.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
└── README.md
```

---

## Common Issues

| Issue                      | Solution                                                         |
| -------------------------- | ---------------------------------------------------------------- |
| Port 3000 already in use   | Change the port in `main.ts` or stop the process using it        |
| Database connection failed | Ensure Docker container is running: `docker start task-postgres` |
| Module not found           | Run `npm install` first                                          |
````
