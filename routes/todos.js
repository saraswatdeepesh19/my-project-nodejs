var express = require("express");
var router = express.Router();

// Simple in-memory todos storage for now
let todos = [];

// Generate UUID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// CREATE - Add a new todo
router.post("/", function (req, res, next) {
  try {
    const { title, description, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const todo = {
      id: generateId(),
      title,
      description: description || "",
      completed: false,
      priority: priority || "medium",
      dueDate: dueDate || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    todos.push(todo);
    res.status(201).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
});

// READ - Get all todos
router.get("/", function (req, res, next) {
  try {
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    next(error);
  }
});

// READ - Get todos by status
router.get("/status/:status", function (req, res, next) {
  try {
    const { status } = req.params;
    const completed = status === "completed";
    const filtered = todos.filter((todo) => todo.completed === completed);
    res.status(200).json({ success: true, data: filtered });
  } catch (error) {
    next(error);
  }
});

// READ - Get todos by priority
router.get("/priority/:priority", function (req, res, next) {
  try {
    const { priority } = req.params;
    if (!["low", "medium", "high"].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: "Invalid priority. Must be low, medium, or high",
      });
    }
    const filtered = todos.filter((todo) => todo.priority === priority);
    res.status(200).json({ success: true, data: filtered });
  } catch (error) {
    next(error);
  }
});

// READ - Get todo by ID
router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo with id ${id} not found`,
      });
    }

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
});

// UPDATE - Update a todo
router.put("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: `Todo with id ${id} not found`,
      });
    }

    const { title, description, completed, priority, dueDate } = req.body;

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate;

    todo.updatedAt = new Date();

    res.status(200).json({ success: true, data: todo });
  } catch (error) {
    next(error);
  }
});

// DELETE - Delete a todo
router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: `Todo with id ${id} not found`,
      });
    }

    const deleted = todos.splice(index, 1);
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: deleted[0],
    });
  } catch (error) {
    next(error);
  }
});

// DELETE - Clear all todos
router.delete("/", function (req, res, next) {
  try {
    todos = [];
    res.status(200).json({ success: true, message: "All todos cleared" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
