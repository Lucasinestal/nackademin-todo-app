const db = require("../database");


getAllTodosLists = () => {
    return new Promise ((resolve, reject) => {
        db.todoLists.find({}, function(err, docs){
            if(err){
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}


getTodoListById = (id) => {
    return new Promise ((resolve, reject) => {
        db.todoLists.findOne({ _id: id }, function (err, docs) {
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
        console.log(newTodoList)
        db.todoLists.insert(newTodoList, function (err, docs){
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
        db.todoLists.update({ _id: id }, { $set: { title: title } }, { multi: true }, function (err, numReplaced) {
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
        db.todoLists.remove({ _id: id }, function (err, numDeleted){
            if (err){
                reject(err)
            } else {
                resolve(numDeleted)
            }
        })
    })
}


clearDatabase = () => {
    return new Promise ((resolve, reject) => {
        db.todoLists.remove({},{multi: true}, function (err, numDeleted){
            resolve(numDeleted);
        });

    })
}


module.exports = { getAllTodosLists, getTodoListById, createTodoList, updateTodoList, deleteTodoList, clearDatabase }