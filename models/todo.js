//const Datastore = require('nedb'), db = new Datastore({ filename: 'todos.db', autoload: true});
const db = require("../database");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
        title: String,
        done: Boolean,
        usersId: String,
        todoListId: String
});

const Todo = mongoose.model("Todo", todoSchema)

getAll = () => {
    return new Promise ((resolve, reject) => {
        Todo.find({}, function(err, docs){
            if(err){
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}

getAllItemsById = (userId) => {
    return new Promise ((resolve, reject) => {
        Todo.find({usersId: userId}, function (err, docs){
            if(err) {
                reject(err);
            } else {
                resolve(docs)
            }
        })
    })
}

getItemById = (id) => {
    return new Promise ((resolve, reject) => {
        Todo.findById({ _id: id }, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs.toObject());
            }
        })
    })
}

createItem = (newTodo) => {
    return new Promise ((resolve, reject) => {
        Todo.create(newTodo, function (err, docs){
            if(err){
                reject(err);
            } else{
                resolve(docs.toObject())
            }
        })
    })
}

updateItem = (id, body) => {
    return new Promise ((resolve, reject) => {
        Todo.updateOne({ _id: id }, { $set: { title: body.title, done: true } }, { multi: true }, function (err, numReplaced) {
            if (err) {
                reject(err);
            } else {
                db.find({ _id: id }, function (err, docs) {
                    resolve(docs.toObject());
                });
            }
        })
    })
}

deleteItem = (id) => {
    return new Promise ((resolve, reject) => {
        Todo.deleteOne({ _id: id }, function (err, numDeleted){
            if (err){
                reject(err)
            } else {
                resolve(numDeleted)
            }
        })
    })
}

deleteAllTodosByUserId = (id) => {
    return new Promise ((resolve, reject) => {
        Todo.deleteMany({ usersId: id }, {multi: true}, function (err, numDeleted){
            if (err){
                reject(err)
            } else {
                resolve(numDeleted)
            }
        })
    })
}

checkItem = (id) => {
    return new Promise ((resolve, reject) => {
        Todo.updateOne({ _id: id }, { $set: { done: true } },  function (err, numReplaced){
            if(err){
                reject(err);
            } else{
                Todo.findById({_id: id}, function (err, docs){
                    resolve(docs.toObject());
                })
            }
        })
    })
}

uncheckItem = (id) => {
    return new Promise ((resolve, reject) => {
        Todo.updateOne({_id: id},{ $set: { done: false} }, function (err, numReplaced){
            if(err){
                reject(err);
            } else{
                Todo.findById({_id: id}, function (err, docs){
                    resolve(docs.toObject());
                })
            }
        })
    })
}

clearDatabase = () => {
    return new Promise ((resolve, reject) => {
        Todo.deleteMany({},{multi: true}, function (err, numDeleted){
            resolve(numDeleted);
        });

    })
}


module.exports = { getAll, getItemById, createItem, updateItem, deleteItem, checkItem, uncheckItem, getAllItemsById, clearDatabase, deleteAllTodosByUserId }