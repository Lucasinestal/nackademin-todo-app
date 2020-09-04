const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
const {expect, request} = chai;
const app = require("../../app");
const User = require("../../models/users");
const testDB = require("../../database/test/users.db")


describe("user integrations test", () => {
    afterEach(async function(){
        await User.clearDatabase()
        const user = await User.createUser({
            email:"integrationstest@gmail.com",
            password:"testing",
            role:"admin"
        })
        const token = await User.loginUser({email:user.email, password:"testing"})
    })  
    it("Should create new user", () => {
        const newUser = {
            email:"new@user.se",
            password:"testing",
            role:"admin"
        }
        request(app)
        .post("/users/create")
        .set("Authorization", `Bearer ${this.token}`)
        .set("Content-Type", "application/json")
        .send(newUser)
        .end((err,res) => {
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.keys(["_id", "email", "password", "role"])
        })
    })
})
