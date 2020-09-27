const model = require("../models/todoList");
const user = require("../middlewares/auth");

getAllTodosLists = async (req,res) => {
    const todoLists = await model.getAllTodosLists();
    res.status(200).json(todoLists);
    }


getAllTodoListsById = async(req,res) => {
    const id = req.user.id;
    const todoList = await model.getAllTodoListsById(id);
    res.send(todoList);
}

getTodoListById = async (req,res) => {
    const userId = req.params.userId;
    const todoList = await model.getTodoListById(userId);
    if(req.user.id === todoList.usersId){
        res.send(todoList);
    } else {
       res.sendStatus(401);
    }
}

createTodoList = async (req,res) => {
    const newTodoList = {
        title: req.body.title,
        usersId: req.user.id
    }
    const createdTodoList = await model.createTodoList(newTodoList);
    res.send(createdTodoList);
}

updateTodoList = async (req,res) => {
    const id = req.params.id;
    const body = req.body;
    const updatedTodoList = await model.updateTodoList(id, body);
    res.send(updatedTodoList);
}

deleteTodoList = async (req, res) => {
    const id = req.params.id;
    const deletedTodoList = await model.deleteTodoList(id);
    res.send("Todo with ID: " + id + " was succesfully deleted");
}

deleteAllTodoListsByUserId = async (req, res) => {
    const id = req.user.id;
    const deletedTodoLists = await model.deleteAllTodoListsByUserId(id);
    res.send("All TodoLists with ID: " + id + " was successfully deleted");
}


module.exports = {getAllTodosLists, getTodoListById, createTodoList, updateTodoList, deleteTodoList, getAllTodoListsById, deleteAllTodoListsByUserId}