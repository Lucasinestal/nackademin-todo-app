const model = require("../models/todo");

getAllTodos = async (req,res) => {
    const todoItems = await model.getAll();
    res.send(todoItems);
}

getTodo = async (req,res) => {
    const id = req.params.id;
    const todoItem = await model.getItemById(id);
    if(req.user.id === todoItem.usersId){
        res.send(todoItem);
        
    } else{
        res.sendStatus(401);
    }
}

createTodo = async (req,res) => {
    const newTodo = {
        title: req.body.title,
        done: false,
        usersId: req.user.id
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

module.exports = {getAllTodos, getTodo, createTodo, updateTodo, deleteTodo, checkTodo, uncheckTodo }