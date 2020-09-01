const Datastore = require('nedb'), db = new Datastore({ filename: 'users.db', autoload: true});
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

getAll = () => {
    return new Promise ((resolve, reject) => {
        db.find({}, function(err, docs){
            if(err){
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}

getUserById = (id) => {
    return new Promise ((resolve, reject) => {
        db.findOne({ _id: id }, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        })
    })
}

createUser = (newUser) => {
    return new Promise ((resolve, reject) => {
        const hash = bcrypt.hashSync(newUser.password, 10)
        newUser.password = hash;
        db.insert(newUser, function (err, docs){
            if(err){
                reject(err);
            } else{
                resolve(docs)
            }
        })
    })
}

updateUser = (id, body) => {
    return new Promise ((resolve, reject) => {
        db.update({ _id: id }, { $set: { title: body.title, done: true, usersId: body.userId } }, { multi: true }, function (err, numReplaced) {
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

deleteUser = (id) => {
    return new Promise ((resolve, reject) => {
        db.remove({ _id: id }, function (err, numDeleted){
            if (err){
                reject(err)
            } else {
                resolve(numDeleted)
            }
        })
    })
}



loginUser = (loginAttempt) => {
    return new Promise ((resolve, reject) => {
        db.findOne({ email: loginAttempt.email }, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                const success = bcrypt.compareSync(loginAttempt.password, docs.password);
                if( success === true){
                    const token = jwt.sign({
                        id: docs._id,
                        email: docs.email,
                        role: docs.role
                    }, process.env.SECRET, {expiresIn: "1h"} )
                    console.log(process.env.SECRET);
                    resolve({token});
                } else {
                    let failed = "Wrong password!";
                    resolve(failed);
                }
            }
        })
    })
}

module.exports = { getAll, getUserById, createUser, updateUser, deleteUser, loginUser }