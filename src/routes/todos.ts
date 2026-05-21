import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

const router = Router();
const todoController = new TodoController();

// CREATE
router.post("/", todoController.createTodo);

// READ
router.get("/", todoController.getAllTodos);
router.get("/completed", todoController.getCompletedTodos);
router.get("/pending", todoController.getPendingTodos);
router.get("/priority/:priority", todoController.getTodosByPriority);
router.get("/:id", todoController.getTodoById);

// UPDATE
router.put("/:id", todoController.updateTodo);

// DELETE
router.delete("/:id", todoController.deleteTodo);
router.delete("/", todoController.clearAllTodos);

export default router;
