//external module
const express = require('express');
const todoItemRouter = express.Router();

//local module
const todoItemsController  = require('../controller/todoItemController');

todoItemRouter.post('/',todoItemsController.createTodoItem);
todoItemRouter.get('/itemList',todoItemsController.getTodoItem);
todoItemRouter.delete('/deleteItem/:id',todoItemsController.deleteTodoItem);
todoItemRouter.put('/completedItem/:id',todoItemsController.completedTodoItem);

exports.todoItemRouter = todoItemRouter;