const chai = require("chai");
chai.should();
const User = require("../../models/users");


describe("Unit test for users", function(){

     afterEach( async () => {
        await User.clearDatabase()
    })

    it("Create new user", async () => {
        const createdUser = await User.createUser({email:"jala@ala.se", password: "hejsanhopsan", role: "user"})
        createdUser.should.be.a("object");
        createdUser.should.have.keys("_id","email","password","role");
    })

    it("login a user", async () => {
        pw = "hemligt"
        const createdUser = await User.createUser({email:"luc@test.se", password:pw})
        const success = await User.loginUser({email:createdUser.email, password:pw})
        success.should.be.a("string");
    })

    it("get all users", async () => {
        await User.createUser({email:"luc@test.se", password:"hemligt"})
        await User.createUser({email:"luc@test.se", password:"hemligt"})
        await User.createUser({email:"luc@test.se", password:"hemligt"})
        const users = await User.getAll()
        users.should.be.a("array");
        users.should.have.keys("0", "1", "2")
    })

    it("get user by ID", async () => {
        const createdUser = await User.createUser({email:"user@user.se", password: "hejsanhopsanfalleralera", role: "user"})
        const user = await User.getUserById(createdUser._id)
        user.should.be.a("object");
        user.should.have.keys("email","password","role","_id");
    })
    it("update a user", async () => {
        const createdUser = await User.createUser({email:"admin@admin.se", password: "hejsanhopsanfalleralera", role: "admin"})
        const body = {
            email: "lol@lol.se",
            role: "user"
        }
        const updatedUser = await User.updateUser(createdUser._id, body);
        updatedUser.should.be.a("array");
        updatedUser.should.have.keys("0");
        updatedUser[0].should.have.property("email", "lol@lol.se")
    })
    
    it("delete a user", async () => {
        const createdUser = await User.createUser({email:"admin@admin.se", password: "hejsanhopsanfalleralera", role: "admin"})
        const deletedUser = await User.deleteUser(createdUser._id);
        deletedUser.should.be.a("number")
    })

})