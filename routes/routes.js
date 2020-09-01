const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const usersController = require('../controllers/users');
const bodyParser = require('body-parser');
const {auth} = require('../middlewares/auth')
const jsonParser = bodyParser.json();

// todo routes

router.get('/todos', jsonParser,auth, todoController.getAllTodos);

router.get('/todos/:id', jsonParser,auth, todoController.getTodo);

router.post('/todos/create', jsonParser,auth, todoController.createTodo);

router.patch('/todos/edit/:id', jsonParser, todoController.updateTodo);

router.delete('/todos/delete/:id', jsonParser,auth, todoController.deleteTodo);

router.post('/todos/check/:id', jsonParser, todoController.checkTodo);

router.post('/todos/uncheck/:id', jsonParser, todoController.uncheckTodo);

// user routes

router.get('/users', jsonParser, usersController.getAllUsers);

router.get('/users/:id', jsonParser, usersController.getUser);

router.post('/users/create', jsonParser, usersController.createUser);

router.patch('/users/edit/:id', jsonParser, usersController.updateUser);

router.delete('/users/delete/:id', jsonParser, usersController.deleteUser);

router.post('/auth', jsonParser, usersController.loginUser);

module.exports = router