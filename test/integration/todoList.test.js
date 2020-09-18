require("dotenv").config();
const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
const {expect, request} = chai;
const app = require("../../app");
const User = require("../../models/users");
const TodoList = require("../../models/todoList");
const { user } = require("../../middlewares/auth");
const Database = require("../../database/index")


describe("Todo List integrations test", () => {

    before( async () => {
        await Database.connect()
    })

    after( async () => {
        await Database.disconnect()
    })
    let token;
    let todoList;
    beforeEach(async function(){
        await TodoList.clearDatabase();
        await User.clearDatabase();
        const user = await User.createUser({
            email:"integrationstest@gmail.com",
            password:"testing",
            role:"admin"
        });
        todoList = await TodoList.createTodoList({
            title: "test integration",
            usersId: "wiugniwngwing"
        });
        await TodoList.createTodoList({
            title: "test integration",
            usersId: "iwangiwngwaign"
        });
        token = await User.loginUser({email:user.email, password:"testing"});
    })  
   it("Should create new todoList", async () => {
        const todoList = {
            title: "Integrations test creating TodoList",
            usersId: user._Id
        }
        const res = await request(app)
            .post("/todoLists/create")
            .set("Authorization", `Bearer ${token}`)
            .set("Content-Type", "application/json")
            .send(todoList)
                expect(res.body).to.be.a("object")
                expect(res.body).to.have.keys("__v","_id", "title", "usersId")
    })
    it("should get all todoLists", async () => {
        const res = await request(app)
        .get("/todoLists")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send()
           expect(res.body).to.be.a("array")
           expect(res.body).to.have.keys("0","1")
    })
    it("should delete a todolist ", async () => {
        const res = await request (app)
        .delete(`/todoLists/delete/${todoList._id}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send()
            expect(res.status).to.be.a("number")
            expect(res.body).to.be.a("object")
        })
})