const model = require("../models/todo");
const user = require("../middlewares/auth");

getAllTodos = async (req,res) => {
    const todoItems = await model.getAll();
    res.send(todoItems);
}

getAllTodosByUserId = async (req,res) => {
    const userId = req.params.userId;
    const todoItems = await model.getAllItemsById(userId);
    if(req.user.id === todoItems[0].usersId){
        res.send(todoItems);
    } else {
       res.sendStatus(401)
    }
}

getTodo = async (req,res) => {
    const id = req.params.id;
    const todoItem = await model.getItemById(id);
        res.send(todoItem);  
}

createTodo = async (req,res) => {
    const newTodo = {
        title: req.body.title,
        done: false,
        usersId: req.user.id,
        todoListId: req.body.todoListId
    }
    const createdTodo = await model.createItem(newTodo);
    res.send(createdTodo);
}

updateTodo = async (req,res) => {
    const id = req.params.id;
    const body = req.body;
    const updatedTodo = await model.updateItem(id, body);
    res.send(updatedTodo);
}

deleteTodo = async (req, res) => {
    const id = req.params.id;
    const deletedTodo = await model.deleteItem(id);
    res.send("Todo with ID: " + id + " was succesfully deleted");
}

deleteAllTodosByUserId = async (req, res) => {
    const id = req.user.id;
    const deletedTodoitems = await model.deleteAllTodosByUserId(id);
    res.send("All TodoLists with ID: " + id + " was successfully deleted");
}

checkTodo = async (req, res) => {
    const id = req.params.id;
    const checkedTodo = await model.checkItem(id)
    res.send(checkedTodo);
}

uncheckTodo = async (req, res) => {
    const id = req.params.id;
    const uncheckedTodo = await model.uncheckItem(id)
    res.send(uncheckedTodo);
}

module.exports = {getAllTodos, getTodo, createTodo, updateTodo, deleteTodo, checkTodo, uncheckTodo, getAllTodosByUserId, deleteAllTodosByUserId}