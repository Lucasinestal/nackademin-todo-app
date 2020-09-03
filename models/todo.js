//const Datastore = require('nedb'), db = new Datastore({ filename: 'todos.db', autoload: true});
const db = require("../database");

getAll = () => {
    return new Promise ((resolve, reject) => {
        db.todos.find({}, function(err, docs){
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
        db.todos.find({usersId: userId}, function (err, docs){
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
        db.todos.findOne({ _id: id }, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        })
    })
}

createItem = (newTodo) => {
    return new Promise ((resolve, reject) => {
        db.todos.insert(newTodo, function (err, docs){
            console.log(newTodo)
            if(err){
                reject(err);
            } else{
                resolve(docs)
            }
        })
    })
}

updateItem = (id, body) => {
    return new Promise ((resolve, reject) => {
        db.todos.update({ _id: id }, { $set: { title: body.title, done: true } }, { multi: true }, function (err, numReplaced) {
            if (err) {
                reject(err);
            } else {
                db.find({ _id: id }, function (err, docs) {
                    resolve(docs);
                });
            }
        })
    })
}

deleteItem = (id) => {
    return new Promise ((resolve, reject) => {
        db.todos.remove({ _id: id }, function (err, numDeleted){
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
        db.todos.update({ _id: id }, { $set: { done: true } },  function (err, numReplaced){
            if(err){
                reject(err);
            } else{
                db.find({_id: id}, function (err, docs){
                    resolve(docs);
                })
            }
        })
    })
}

uncheckItem = (id) => {
    return new Promise ((resolve, reject) => {
        db.todos.update({_id: id},{ $set: { done: false} }, function (err, numReplaced){
            if(err){
                reject(err);
            } else{
                db.find({_id: id}, function (err, docs){
                    resolve(docs);
                })
            }
        })
    })
}


module.exports = { getAll, getItemById, createItem, updateItem, deleteItem, checkItem, uncheckItem, getAllItemsById }