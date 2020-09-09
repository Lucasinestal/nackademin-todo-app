const model = require("../models/todoList");
const user = require("../middlewares/auth");

getAllTodosLists = async (req,res) => {
    const todoLists = await model.getAllTodosLists();
    console.log(req.body)
    res.send(todoLists);
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


module.exports = {getAllTodosLists, getTodoListById, createTodoList, updateTodoList, deleteTodoList}