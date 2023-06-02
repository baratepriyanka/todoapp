const express = require('express');
const router = express.Router();

const TodoController = require('../controller/todo');
router.post('/todos', TodoController.getAdd);
router.get('/todos', TodoController.getAlltodo);
router.get('/:id', TodoController.getOnetodo);
router.post('/updatetodo/:id', TodoController.getUpdateTodo);
router.post('/todos/:id', TodoController.getDeleteTodo);

module.exports = router;
