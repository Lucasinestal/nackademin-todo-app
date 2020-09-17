const chai = require("chai");
chai.should();
const TodoList = require("../../models/todoList");
const todoList = require("../../models/todoList");
const Database = require("../../database/index");


describe("Unit test for todosLists", function(){

    before( async () => {
        await Database.connect()
    })

    after( async () => {
        await Database.disconnect()
    })


    afterEach( async () => {
       await TodoList.clearDatabase()
   })

   it("Create new todoList", async () => {
       const createdList = await todoList.createTodoList({title:"Nytt test TodoList", usersId:"n9qk2pdHn7tcnSXO"})
       createdList.should.be.a("object");
       //createdList.should.have.keys("title", "usersId","_id");
   })
  

   it("get all todoLists", async () => {
       await TodoList.createTodoList({title:"test@test.se", usersId: "n9qk2pdHn7tcnSXO"});
       await TodoList.createTodoList({title:"test2@test2.se", usersId: "n9qk2pdHn7tcnSXO"});
       const todoList = await TodoList.getAllTodosLists();
       todoList.should.be.a("array");
      // todoList.should.have.keys("0","1")
   })

   it("get todoList with todoList ID", async () => {
       const createdTodoList = await TodoList.createTodoList({title:"Ny Todo Lista", usersId: "n9qk2pdHn7tcnSXO"})
       const todoList = await TodoList.getTodoListById(createdTodoList._id)
       todoList.should.be.a("object");
      // todoList.should.have.keys("title", "usersId", "_id");
   })
   
   it("delete a todoList", async () => {
       const createdTodoList = await TodoList.createTodoList({title:"Test todoList", usersId: "n9qk2pdHn7tcnSXO"})
       const deletedTodoList = await TodoList.deleteTodoList(createdTodoList._id);
      // deletedTodoList.should.be.a("number")
   })

})