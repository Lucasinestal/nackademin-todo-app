require("dotenv").config();
const chai = require("chai");
const chaihttp = require("chai-http");
chai.use(chaihttp);
const {expect, request} = chai;
const app = require("../../app");
const User = require("../../models/users");


describe("user integrations test", () => {
    let token;
    beforeEach(async function(){
        await User.clearDatabase()
        const user = await User.createUser({
            email:"integrationstest@gmail.com",
            password:"testing",
            role:"admin"
        })
        token = await User.loginUser({email:user.email, password:"testing"})
        console.log(token)
    })  
    it("Should create new user", () => {
        const newUser = {
            email:"new@user.se",
            password:"testing",
            role:"admin"
        }
        request(app)
        .post("/users/create")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send(newUser)
        .end((err,res) => {
            console.log(res.body)
            console.log(res.status)
           expect(res.body).to.be.a("object")
           expect(res.body).to.have.keys("_id", "email", "password", "role")
        })
    })
})
