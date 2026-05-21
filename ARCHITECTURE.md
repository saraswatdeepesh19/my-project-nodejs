# Todo App Backend - Best Practice Architecture

This is a modern Node.js/Express/TypeScript backend following enterprise architecture patterns.

## Architecture Pattern

```
Routes (Express)
  ↓ (HTTP Requests)
Controllers (Request/Response Handling)
  ↓ (Business Logic)
Services (Core Business Operations)
  ↓ (Data Operations)
Repositories (Data Access)
  ↓
Data Store (In-Memory Array)
```

## Project Structure

```
├── src/
│   ├── entities/              # Data models/interfaces
│   │   ├── todo.entity.ts
│   │   └── note.entity.ts
│   ├── dtos/                  # Data Transfer Objects
│   │   ├── create-todo.dto.ts
│   │   ├── update-todo.dto.ts
│   │   └── todo-response.dto.ts
│   ├── repositories/          # Data access layer
│   │   └── todo.repository.ts
│   ├── services/              # Business logic layer
│   │   └── todo.service.ts
│   ├── controllers/           # Request handlers
│   │   └── todo.controller.ts
│   ├── routes/                # API endpoints
│   │   ├── index.ts
│   │   ├── users.ts
│   │   └── todos.ts
│   ├── exceptions/            # Custom exceptions
│   │   └── not-found.exception.ts
│   ├── index.ts               # Express app setup
│   └── server.ts              # Server entry point
├── bin/www                    # Start script
├── public/                    # Static files
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

## Key Design Principles

### 1. **Separation of Concerns**

- **Routes**: Define endpoints only, delegate to controllers
- **Controllers**: Handle HTTP logic, validate requests, format responses
- **Services**: Contain business logic, can be reused by multiple controllers
- **Repositories**: Handle all data operations

### 2. **Dependency Injection**

Each layer depends on the layer below it:

```typescript
// routes/todos.ts
const todoController = new TodoController();

// TodoController
private todoService: TodoService;
constructor() {
  this.todoService = new TodoService();
}

// TodoService
private todoRepository: TodoRepository;
constructor() {
  this.todoRepository = new TodoRepository();
}
```

### 3. **DTOs (Data Transfer Objects)**

- Define expected input/output shapes
- Validate data at controller level
- Decouples internal entities from API contracts

### 4. **Type Safety**

Full TypeScript with strict mode for compile-time error catching

## API Endpoints

### Todo Routes (`/todos`)

| Method | Endpoint                    | Handler              |
| ------ | --------------------------- | -------------------- |
| POST   | `/todos`                    | `createTodo`         |
| GET    | `/todos`                    | `getAllTodos`        |
| GET    | `/todos/:id`                | `getTodoById`        |
| GET    | `/todos/completed`          | `getCompletedTodos`  |
| GET    | `/todos/pending`            | `getPendingTodos`    |
| GET    | `/todos/priority/:priority` | `getTodosByPriority` |
| PUT    | `/todos/:id`                | `updateTodo`         |
| DELETE | `/todos/:id`                | `deleteTodo`         |
| DELETE | `/todos`                    | `clearAllTodos`      |

## Running the Application

```bash
# Install dependencies
npm install

# Development (with auto-reload)
npm run dev

# Production (compile and run)
npm start

# Build only
npm run build
```

## Example Requests

### Create Todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "high"
  }'
```

### Get All Todos

```bash
curl http://localhost:3000/todos
```

### Update Todo

```bash
curl -X PUT http://localhost:3000/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### Delete Todo

```bash
curl -X DELETE http://localhost:3000/todos/{id}
```

## Benefits of This Architecture

✅ **Testability** - Easy to unit test each layer independently
✅ **Maintainability** - Clear separation makes code easier to understand and modify
✅ **Scalability** - New features can be added without affecting existing layers
✅ **Reusability** - Business logic in services can be used by different controllers or APIs (REST, GraphQL, etc.)
✅ **Type Safety** - TypeScript catches errors at compile time
✅ **Database Agnostic** - Switching databases only requires changing the Repository layer

## Next Steps for Production

1. **Database Integration** - Replace in-memory storage with PostgreSQL, MongoDB, etc.
2. **Logging** - Add structured logging (Winston, Pino)
3. **Error Handling** - Implement global error handler middleware
4. **Authentication** - Add JWT or OAuth2
5. **Validation** - Add input validation library (class-validator, Joi)
6. **Testing** - Add unit and integration tests
7. **Documentation** - Generate API docs with Swagger/OpenAPI
