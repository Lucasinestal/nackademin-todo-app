require("dotenv").config();
const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
const {expect, request} = chai;
const app = require("../../app");
const User = require("../../models/users");
const Database = require("../../database/index")


describe("user integrations test", () => {

    before( async () => {
        await Database.connect()
    })

    after( async () => {
        await Database.disconnect()
    })

    let token;
    beforeEach(async function(){
        await User.clearDatabase()
        const user = await User.createUser({
            email:"integrationstest@gmail.com",
            password:"testing",
            role:"admin"
        })
        token = await User.loginUser({email:user.email, password:"testing"})
    })  
    it("Should create new user", async () => {
        const newUser = {
            email:"new@user.se",
            password:"testing",
            role:"admin"
        }
        const res = await request(app)
        .post("/users/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send(newUser)
           expect(res.body).to.be.a("object")
           expect(res.body).to.have.keys("__v", "_id", "email", "password", "role")
    })
})
