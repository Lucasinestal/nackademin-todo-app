const jwt = require("jsonwebtoken");
require("dotenv").config();



auth =  async (req, res, next) =>  {
    if( ! req.headers.authorization ){
        return res.sendStatus(403);
    } else {
        
        const payload = req.headers.authorization.replace("Bearer ", "");
        console.log("crypted payload:" + payload);
        try{
            req.user = jwt.verify(payload, process.env.SECRET)
            console.log(req.user.role);
            next()
        } catch (err){
            res.sendStatus(403);
        }
    }
    

}

module.exports = {auth}