const chai = require("chai");
chai.should();
const User = require("../../models/users");
const { user } = require("../../middlewares/auth");

describe("Unit test for users", function(){

     after( async () => {
        await User.clearDatabase()
    })

    it("Create new user", async () => {
        const createdUser = await User.createUser({email:"jala@ala.se", password: "hejsanhopsan", role: "user"})
        createdUser.should.be.a("object");
        createdUser.should.have.keys("_id","email","password","role");
    })

    it("login a user", async () => {
        const success = await User.loginUser({email:"jala@ala.se", password:"hejsanhopsan"})
        success.should.be.a("object");
        success.should.have.keys("token");
    })

    it("get all users", async () => {
        const users = await User.getAll()
        users.should.be.a("array");
        users.should.have.keys("0")
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