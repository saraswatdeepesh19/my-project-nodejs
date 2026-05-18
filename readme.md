# Express + TypeScript Project Setup

## Prerequisites

Install:

- Node.js
- npm
- VS Code

---

# Verify Installation

```bash
node -v
npm -v
```

---

# MAC / LINUX / GIT BASH SETUP

## 1. Create Project

```bash
mkdir express-ts-app
cd express-ts-app
```

---

## 2. Initialize Node Project

```bash
npm init -y
```

---

## 3. Install Express

```bash
npm install express
```

---

## 4. Install TypeScript & Dev Dependencies

```bash
npm install -D typescript ts-node-dev @types/node @types/express
```

---

## 5. Initialize TypeScript

```bash
npx tsc --init
```

---

## 6. Create Folder Structure

```bash
mkdir -p src/routes src/controllers src/services src/repositories src/middleware src/config
```

---

## 7. Create Files

```bash
touch src/app.ts
touch src/server.ts
touch src/routes/userRoutes.ts
```

---

# WINDOWS CMD SETUP

## 1. Create Project

```bash
mkdir express-ts-app

cd express-ts-app
```

---

## 2. Initialize Node Project

```bash
npm init -y
```

---

## 3. Install Express

```bash
npm install express
```

---

## 4. Install TypeScript & Dev Dependencies

```bash
npm install -D typescript ts-node-dev @types/node @types/express
```

---

## 5. Initialize TypeScript

```bash
npx tsc --init
```

---

## 6. Create Folder Structure

```bash
mkdir src
mkdir src\routes
mkdir src\controllers
mkdir src\services
mkdir src\repositories
mkdir src\middleware
mkdir src\config
```

---

## 7. Create Files

```bash
type nul > src\app.ts
type nul > src\server.ts
type nul > src\routes\userRoutes.ts
```

---

# tsconfig.json

Replace the generated `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

# package.json Scripts

Add these scripts inside `package.json`

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

---

# src/app.ts

```typescript
import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

export default app;
```

---

# src/server.ts

```typescript
import app from "./app";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

# src/routes/userRoutes.ts

```typescript
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users API Working");
});

export default router;
```

---

# Run Project

```bash
npm run dev
```

---

# Test API

Open:

```text
http://localhost:3000/users
```

Expected Output:

```text
Users API Working
```

---

# Recommended VS Code Extensions

- ESLint
- Prettier

---

# Recommended Future Folder Structure

```text
src/
 ├── routes/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── middleware/
 ├── config/
 ├── app.ts
 └── server.ts
```
