const todoModel = require("../models/todo");
const userModel = require("../models/users");
const todoListModel = require("../models/todoList");
const path = require("path")

getPrivacyPolicy = async (req,res) => {
    res.sendFile(path.resolve(__dirname +'../../public/privacyPolicy.txt'));
}


getAllUserInfo = async (req, res) => {
    let id = req.user.id;
    const todoLists = await todoListModel.getAllTodoListsById(id)
    const user = await userModel.getUserById(id)
    const todoItems = await todoModel.getAllItemsById(id)
    res.send({todoLists, user, todoItems})

}


deleteAllUserInfo = async (req, res) => {
    let id = req.user.id
    const deletedTodoLists = await todoListModel.deleteAllTodoListsByUserId(id)
    const user = await userModel.deleteUser(id)
    const todoItems = await todoModel.deleteAllTodosByUserId(id)
    const message = "The following information was successfully deleted:"
    res.send ({message ,deletedTodoLists, user, todoItems})

}



module.exports = { getPrivacyPolicy, getAllUserInfo, deleteAllUserInfo} 