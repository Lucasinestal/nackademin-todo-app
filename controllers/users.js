const model = require("../models/users");

getAllUsers = async (req,res) => {
    const allUsers = await model.getAll();
    res.send(allUsers);
}

getUser = async (req,res) => {
    const id = req.params.id;
    const user = await model.getUserById(id);
    res.send(user);
}

createUser = async (req,res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }
    const createdUser = await model.createUser(newUser);
    res.send(createdUser);
}

updateUser= async (req,res) => {
    const id = req.params.id;
    const body = req.body;
    const updatedUser = await model.updateUser(id, body);
    res.send(updatedUser);
}

deleteUser = async (req, res) => {
    const id = req.params.id;
    const deletedUser = await model.deleteUser(id);
    res.send("Todo with ID: " + id + " was succesfully deleted");
}

loginUser = async (req, res) => {
    const loginAttempt = req.body;
    const user = await model.loginUser(loginAttempt);
    res.send(user); 
}


module.exports = {getAllUsers, getUser, createUser, updateUser, deleteUser, loginUser}