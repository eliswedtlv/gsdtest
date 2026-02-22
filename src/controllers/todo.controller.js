const { positive, negative } = require('../helpers/response');

let todos = [];
let nextId = 1;

const getAllTodos = (req, res, next) => {
  try {
    return res.status(200).json(positive('todo', 'Todos retrieved', todos));
  } catch (err) {
    next(err);
  }
};

const getTodoById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return res.status(404).json(negative('todo', `Todo with id ${id} not found`));
    }
    return res.status(200).json(positive('todo', 'Todo retrieved', todo));
  } catch (err) {
    next(err);
  }
};

const createTodo = (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json(negative('todo', 'Title is required and cannot be empty'));
    }

    const todo = {
      id: nextId++,
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };
    todos.push(todo);

    return res.status(201).json(positive('todo', 'Todo created', todo));
  } catch (err) {
    next(err);
  }
};

const updateTodo = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
      return res.status(404).json(negative('todo', `Todo with id ${id} not found`));
    }

    const { title, completed } = req.body;
    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json(negative('todo', 'Title cannot be empty'));
      }
      todo.title = title.trim();
    }
    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        return res.status(400).json(negative('todo', 'Completed must be a boolean'));
      }
      todo.completed = completed;
    }

    return res.status(200).json(positive('todo', 'Todo updated', todo));
  } catch (err) {
    next(err);
  }
};

const deleteTodo = (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      return res.status(404).json(negative('todo', `Todo with id ${id} not found`));
    }

    const deleted = todos.splice(index, 1)[0];
    return res.status(200).json(positive('todo', 'Todo deleted', deleted));
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo };
