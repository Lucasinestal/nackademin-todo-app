const jwt = require("jsonwebtoken");
require("dotenv").config();



auth =  async (req, res, next) =>  {
    if( ! req.headers.authorization ){
        return res.sendStatus(403);
    } else {
        const payload = req.headers.authorization.replace("Bearer ", "");
        try{
            req.user = jwt.verify(payload, process.env.SECRET)
            next()
        } catch (err){
            res.sendStatus(403);
        }
    }
    

}

user = async (req, res, next) => {
    console.log(req.user);
    if(req.user.role === "user" || req.user.role === "admin"){
         next();
    } else {
        res.sendStatus(401);
    }
}

admin = async (req, res, next) => {
    console.log(req.user);
    if(req.user.role === "admin"){
         next();
    } else {
        res.sendStatus(401);
    }
}
    

module.exports = {auth, user, admin}