const { Router } = require('express');
const { createTodo, getAllTodos, getTodoById, updateTodo, deleteTodo } = require('./todoStore');

const router = Router();

// POST /todos - create a new todo
router.post('/', (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'text is required and must be a non-empty string' });
  }

  const todo = createTodo(text.trim());
  res.status(201).json(todo);
});

// GET /todos - list all todos
router.get('/', (req, res) => {
  res.json(getAllTodos());
});

// GET /todos/:id - get one todo
router.get('/:id', (req, res) => {
  const todo = getTodoById(req.params.id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// PUT /todos/:id - update a todo
router.put('/:id', (req, res) => {
  const { text, completed } = req.body;

  if (text !== undefined && (typeof text !== 'string' || text.trim().length === 0)) {
    return res.status(400).json({ error: 'text must be a non-empty string' });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'completed must be a boolean' });
  }

  const updates = {};
  if (text !== undefined) updates.text = text.trim();
  if (completed !== undefined) updates.completed = completed;

  const todo = updateTodo(req.params.id, updates);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

// DELETE /todos/:id - remove a todo
router.delete('/:id', (req, res) => {
  const todo = deleteTodo(req.params.id);
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.status(204).send();
});

module.exports = router;
