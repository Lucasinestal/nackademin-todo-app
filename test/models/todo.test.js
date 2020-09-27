const chai = require("chai");
chai.should();
const Todo = require("../../models/todo");
const Database = require("../../database/index")


describe("Unit test for todos", function(){

    before( async () => {
        await Database.connect()
    })

    after( async () => {
        await Database.disconnect()
    })


    afterEach( async () => {
       await Todo.clearDatabase()
   })

   it("Create new todo", async () => {
       const createdItem = await Todo.createItem({title:"jalla@alla.se", done: false, usersId:"n9qk2pdHn7tcnSXO", todoListId: "wiqngq0ignq0ginqgim"})
       createdItem.should.be.a("object");
       createdItem.should.have.keys("__v", "title","done","usersId","_id", "todoListId");
   })


   it("get all todos", async () => {
       await Todo.createItem({title:"test@test.se", done: false, usersId: "n9qk2pdHn7tcnSXO", todoListId: "wiqngq0ignq0ginqgim"});
       await Todo.createItem({title:"test2@test2.se", done: false, usersId: "n9qk2pdHn7tcnSXO", todoListId: "wiqngq0ignq0ginqgim"});
       const todoItems = await Todo.getAll();
       todoItems.should.be.a("array");
       todoItems.should.have.keys("0","1")
   })

   it("get all todos on a specific usersID", async () => {
       await Todo.createItem({title:"jalla@alla.se", done: false, usersId: "n9qk2pdHn7tcnSXO", todoListId: "wiqngq0ignq0ginqgim"})
       await Todo.createItem({title:"jalla@alla.se", done: false, usersId: "n9qk2pdHn7tcnSXO", todoListId: "wiqngq0ignq0ginqgim"})
       Todo.createItem({title:"jalla@alla.se", done: false, usersId: "n9qk2pdHn7tcnSXO", todoListId: "wiqngq0ignq0ginqgim"})
       const todoItems = await Todo.getAllItemsById("n9qk2pdHn7tcnSXO")
       todoItems.should.be.a("array");
       todoItems.should.have.keys("0","1");
   })

   it("get todo item with todoitem ID", async () => {
       const createdTodo = await Todo.createItem({title:"Todo@item.se", done: false, usersId: "n9qk2pdHn7tcnSXO", todoListId: "wiqngq0ignq0ginqgim"})
       const todoItem = await Todo.getItemById(createdTodo._id)
       todoItem.should.be.a("object");
       todoItem.should.have.keys("__v", "title", "done", "usersId", "_id", "todoListId");
   })
   
   it("delete a todo", async () => {
       const createdTodo = await Todo.createItem({title:"admin@admin.se", done: true, usersId: "n9qk2pdHn7tcnSXO", todoListId: "wiqngq0ignq0ginqgim"})
       const deletedTodo = await Todo.deleteItem(createdTodo._id);
       deletedTodo.should.be.a("object")
   })

   it("check a todo as done: true", async () => {
       const createdTodo = await Todo.createItem({title:"admin@admin.se", done: false, usersId: "n9qk2pdHn7tcnSXO", todoListId: "wiqngq0ignq0ginqgim"})
       checkedItem = await Todo.checkItem(createdTodo._id);
       checkedItem.should.be.a("object")
       checkedItem.should.have.property("done", true);
   })
   it("uncheck a todo as done: false", async () => {
       const createdTodo = await createItem({title: "test uncheck todoitem", done: true, usersId:"0iqnwginqg"});
       uncheckedItem = await Todo.uncheckItem(createdTodo._id);
       uncheckedItem.should.be.a("object")
       uncheckedItem.should.have.property("done", false);
   })

})