const db = require("../database");
const mongoose = require("mongoose");

const todoListsSchema = new mongoose.Schema({
    title: String,
    usersId: String
});

const TodoLists = mongoose.model("TodoList", todoListsSchema);


getAllTodosLists = () => {
    return new Promise ((resolve, reject) => {
        TodoLists.find({}, function(err, docs){
            if(err){
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}


getAllTodoListsById = (id) => {
    return new Promise ((resolve, reject) => {
        TodoLists.find({ usersId: id }, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        })
    })
}


getTodoListById = (id) => {
    return new Promise ((resolve, reject) => {
        TodoLists.findById({ _id: id }, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        })
    })
}

createTodoList = (newTodoList) => {
    return new Promise ((resolve, reject) => {
        TodoLists.create(newTodoList, function (err, docs){
            if(err){
                reject(err);
            } else{
                resolve(docs)
            }
        })
    })
}

updateTodoList = (id, body) => {
    return new Promise ((resolve, reject) => {
        TodoLists.updateOne({ _id: id }, { $set: { title: title } }, { multi: true }, function (err, numReplaced) {
            if (err) {
                reject(err);
            } else {
                db.TodoLists.find({ _id: id }, function (err, docs) {
                    resolve(docs);
                });
            }
        })
    })
}

deleteTodoList = (id) => {
    return new Promise ((resolve, reject) => {
        TodoLists.deleteOne({ _id: id }, function (err, numDeleted){
            if (err){
                reject(err)
            } else {
                resolve(numDeleted)
            }
        })
    })
}

deleteAllTodoListsByUserId = (id) => {
    return new Promise ((resolve, reject) => {
        TodoLists.deleteMany({usersId: id},  { multi: true }, function (err, numDeleted){
            if(err){
                reject(err)
            } else{
                resolve(numDeleted)
            }
        })
    })
}



clearDatabase = () => {
    return new Promise ((resolve, reject) => {
        TodoLists.deleteMany({},{multi: true}, function (err, numDeleted){
            resolve(numDeleted);
        });

    })
}


module.exports = { getAllTodosLists, getTodoListById, createTodoList, updateTodoList, deleteTodoList, clearDatabase, getAllTodoListsById, deleteAllTodoListsByUserId }