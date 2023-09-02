const mongoose = require("mongoose");

const connectDB = (connectString) =>{
    return mongoose.connect(connectString)
    .then(()=>{
        console.log("Connected to Database");
    })
    .catch((err)=>{
        console.log(err);
    });
}


module.exports = connectDB;