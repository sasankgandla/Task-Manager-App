const express = require("express")
const app = express();
const connectDB = require("./db/connect");

require("dotenv").config();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('./public'))

const tasks = require("./routes/tasks")
app.use("/api/v1/tasks",tasks);

const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000,()=>{
            console.log("Listening on port 3000");
        })
    } catch (error) {
        console.log(error);
    }
}

start();