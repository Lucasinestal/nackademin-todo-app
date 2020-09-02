const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const usersController = require('../controllers/users');
const bodyParser = require('body-parser');
const authenticate = require('../middlewares/auth')
const jsonParser = bodyParser.json();

// todo routes

router.get('/todos', jsonParser,authenticate.auth, authenticate.admin, todoController.getAllTodos);

router.get('/todos/:id', jsonParser,authenticate.auth ,authenticate.user, todoController.getTodo);

router.get('/todos/user/:userId', jsonParser, authenticate.auth, authenticate.user, todoController.getAllTodosByUserId)

router.post('/todos/create', jsonParser,authenticate.auth, authenticate.user, todoController.createTodo);

router.patch('/todos/edit/:id', jsonParser, authenticate.auth, authenticate.user, todoController.updateTodo);

router.delete('/todos/delete/:id', jsonParser, authenticate.auth, authenticate.admin, todoController.deleteTodo);

router.post('/todos/check/:id', jsonParser, authenticate.auth, authenticate.user, todoController.checkTodo);

router.post('/todos/uncheck/:id', jsonParser, authenticate.auth , authenticate.user, todoController.uncheckTodo);

// user routes

router.get('/users', jsonParser,authenticate.auth, usersController.getAllUsers);

router.get('/users/:id', jsonParser,authenticate.auth, usersController.getUser);

router.post('/users/create', jsonParser,authenticate.auth, authenticate.admin, usersController.createUser);

router.patch('/users/edit/:id', jsonParser,authenticate.auth, authenticate.user, usersController.updateUser);

router.delete('/users/delete/:id', jsonParser,authenticate.auth, authenticate.admin, usersController.deleteUser);

// Auth routes

router.post('/auth', jsonParser, usersController.loginUser);

module.exports = router


 /*{
    "email": "admin@admino.se",
    "password": "secreto"
} */