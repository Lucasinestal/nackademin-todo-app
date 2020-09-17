const mongoose = require('mongoose');
const app = require("./app")
const port = process.env.PORT || 3000
const database = require("./database/index")

database.connect().then( () => 
    app.listen(port, () => {
        console.log(`Running on 3000!`)
    })
)

