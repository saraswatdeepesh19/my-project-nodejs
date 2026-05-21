import { TodoRepository } from "../repositories/todo.repository";
import { Todo } from "../entities/todo.entity";
import { CreateTodoDto } from "../dtos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/update-todo.dto";
import { NotFoundException } from "../exceptions/not-found.exception";

export class TodoService {
  private todoRepository: TodoRepository;

  constructor() {
    this.todoRepository = new TodoRepository();
  }

  createTodo(createTodoDto: CreateTodoDto): Todo {
    return this.todoRepository.create(createTodoDto);
  }

  getAllTodos(): Todo[] {
    return this.todoRepository.findAll();
  }

  getTodoById(id: string): Todo {
    const todo = this.todoRepository.findById(id);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  getCompletedTodos(): Todo[] {
    return this.todoRepository.findByCompleted(true);
  }

  getPendingTodos(): Todo[] {
    return this.todoRepository.findByCompleted(false);
  }

  getTodosByPriority(priority: "low" | "medium" | "high"): Todo[] {
    return this.todoRepository.findByPriority(priority);
  }

  updateTodo(id: string, updateTodoDto: UpdateTodoDto): Todo {
    const todo = this.todoRepository.update(id, updateTodoDto);
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  deleteTodo(id: string): void {
    const deleted = this.todoRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }

  clearAllTodos(): void {
    this.todoRepository.deleteAll();
  }
}
