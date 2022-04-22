const mongoose = require('mongoose');


//creating a database
mongoose.connect("mongodb://localhost:27017/myWebsite").then(()=>{
    console.log("Connection to the DB Success")
})
.catch((err)=>{
    console.log("falied... to DB")
})

