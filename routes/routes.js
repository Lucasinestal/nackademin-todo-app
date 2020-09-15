const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const usersController = require('../controllers/users');
const todoListsController = require("../controllers/todoList");
const bodyParser = require('body-parser');
const authenticate = require('../middlewares/auth');
const jsonParser = bodyParser.json();
const gdprController = require('../controllers/gdpr');

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

// todoLists routes

router.get('/todoLists', jsonParser,authenticate.auth, todoListsController.getAllTodosLists);

router.get('/todoLists/:id', jsonParser,authenticate.auth, todoListsController.getTodoListById);

router.post('/todoLists/create', jsonParser,authenticate.auth, authenticate.admin, todoListsController.createTodoList);

router.patch('/todoLists/edit/:id', jsonParser,authenticate.auth, authenticate.user, todoListsController.updateTodoList);

router.delete('/todoLists/delete/:id', jsonParser,authenticate.auth, authenticate.admin, todoListsController.deleteTodoList);


//Privacy policy / GDPR Routes

router.get('/userpolicies', jsonParser, authenticate.auth, authenticate.user, gdprController.getPrivacyPolicy);

router.get('/userinfo', jsonParser, authenticate.auth, authenticate.user, gdprController.getAllUserInfo);
 
router.delete('/userinfo/delete', jsonParser, authenticate.auth, authenticate.user, gdprController.deleteAllUserInfo);


module.exports = router

