import { v4 as uuidv4 } from "uuid";
import { Todo } from "../entities/todo.entity";
import { CreateTodoDto } from "../dtos/create-todo.dto";
import { UpdateTodoDto } from "../dtos/update-todo.dto";

export class TodoRepository {
  private todos: Todo[] = [];

  create(createTodoDto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: uuidv4(),
      title: createTodoDto.title,
      description: createTodoDto.description,
      completed: false,
      priority: createTodoDto.priority || "medium",
      dueDate: createTodoDto.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findById(id: string): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  findByCompleted(completed: boolean): Todo[] {
    return this.todos.filter((todo) => todo.completed === completed);
  }

  findByPriority(priority: "low" | "medium" | "high"): Todo[] {
    return this.todos.filter((todo) => todo.priority === priority);
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Todo | undefined {
    const todo = this.findById(id);
    if (!todo) return undefined;

    Object.assign(todo, {
      ...updateTodoDto,
      updatedAt: new Date(),
    });
    return todo;
  }

  delete(id: string): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos.length < initialLength;
  }

  deleteAll(): void {
    this.todos = [];
  }
}
