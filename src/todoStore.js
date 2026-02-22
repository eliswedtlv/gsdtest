const { v4: uuidv4 } = require('uuid');

const todos = new Map();

function createTodo(text) {
  const todo = {
    id: uuidv4(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.set(todo.id, todo);
  return todo;
}

function getAllTodos() {
  return Array.from(todos.values());
}

function getTodoById(id) {
  return todos.get(id) || null;
}

function updateTodo(id, updates) {
  const todo = todos.get(id);
  if (!todo) return null;

  if (updates.text !== undefined) todo.text = updates.text;
  if (updates.completed !== undefined) todo.completed = updates.completed;

  return todo;
}

function deleteTodo(id) {
  const todo = todos.get(id);
  if (!todo) return null;
  todos.delete(id);
  return todo;
}

module.exports = { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo };
