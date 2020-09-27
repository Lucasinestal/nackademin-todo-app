require("dotenv").config();
const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
const {expect, request} = chai;
const app = require("../../app");
const User = require("../../models/users");
const TodoList = require("../../models/todoList")
const Todo = require("../../models/todo");
const { user } = require("../../middlewares/auth");
const Database = require("../../database/index")


describe("Todos integrations test", () => {

    before( async () => {
        await Database.connect()
    })

    after( async () => {
        await Database.disconnect()
    })
    let token;
    let todo;
    beforeEach(async function(){
        await Todo.clearDatabase();
        await User.clearDatabase();
        const user = await User.createUser({
            email:"integrationstest@gmail.com",
            password:"testing",
            role:"admin"
        });
        todo = await Todo.createItem({
            title: "test integration",
            usersId: "wiugniwngwing"
        });
        await TodoList.createTodoList({
            title: "test integration",
            usersId: "iwangiwngwaign"
        });
        token = await User.loginUser({email:user.email, password:"testing"});
    })  
   it("Should create new todo", async () => {
    let todoList = await TodoList.createTodoList({
        title: "test integration",
        usersId: "wiugniwngwing"
    });

    let user = await User.createUser({email: "test@test.se", password: "test", role:"admin"})
    const newTodo = {
        title: "Integrations test",
        done: true,
        todoListId: todoList._id,
        usersId: user._id,
    }
        const res = await request(app)
            .post("/todos/create")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send(newTodo)
                expect(res.body).to.be.a("object")
                expect(res.body).to.have.keys("__v","_id", "done", "title", "todoListId", "usersId")
    })

})