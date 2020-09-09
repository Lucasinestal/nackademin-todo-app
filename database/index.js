var Datastore = require("nedb");
require("dotenv").config();

db = {};
switch (process.env.ENVIRONMENT) {
  case "development":
    db.todos = new Datastore({
      filename: __dirname + "/development/todos.db",
      autoload: true,
    });
    db.users = new Datastore({
      filename: __dirname + "/development/users.db",
      autoload: true,
    });
    db.todoLists = new Datastore({
      filename: __dirname + "/development/todoLists.db",
      autoload: true,
    });
    break;
  case "test":
    db.todos = new Datastore({
        filename: __dirname + "/test/todos.db",
        autoload: true,
      });
      db.users = new Datastore({
        filename: __dirname + "/test/users.db",
        autoload: true,
      });
      db.todoLists = new Datastore({
        filename: __dirname + "/test/todoLists.db",
        autoload: true,
      });
    break;
}

module.exports = db;