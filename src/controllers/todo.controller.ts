import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todo.service";
import { CreateTodoDto } from "../dtos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/update-todo.dto";

export class TodoController {
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();
  }

  createTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const createTodoDto: CreateTodoDto = req.body;
      const todo = this.todoService.createTodo(createTodoDto);
      res.status(201).json({ success: true, data: todo });
    } catch (error) {
      next(error);
    }
  };

  getAllTodos = (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = this.todoService.getAllTodos();
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      next(error);
    }
  };

  getTodoById = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const todo = this.todoService.getTodoById(id);
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      next(error);
    }
  };

  getCompletedTodos = (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = this.todoService.getCompletedTodos();
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      next(error);
    }
  };

  getPendingTodos = (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = this.todoService.getPendingTodos();
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      next(error);
    }
  };

  getTodosByPriority = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { priority } = req.params;
      if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
          success: false,
          message: "Invalid priority. Must be low, medium, or high",
        });
      }
      const todos = this.todoService.getTodosByPriority(
        priority as "low" | "medium" | "high",
      );
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      next(error);
    }
  };

  updateTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateTodoDto: UpdateTodoDto = req.body;
      const todo = this.todoService.updateTodo(id, updateTodoDto);
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      next(error);
    }
  };

  deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      this.todoService.deleteTodo(id);
      res
        .status(200)
        .json({ success: true, message: "Todo deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  clearAllTodos = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.todoService.clearAllTodos();
      res.status(200).json({ success: true, message: "All todos cleared" });
    } catch (error) {
      next(error);
    }
  };
}
