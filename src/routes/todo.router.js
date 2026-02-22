const router = require('express').Router();
const todoController = require('../controllers/todo.controller');

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = {
  connect(app) {
    app.use('/api/todos', router);
  }
};
