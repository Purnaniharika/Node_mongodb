const express = require('express')


const {connectMongoDb} = require("./connection.js");

const {logReqRes} = require("./middlewares/index.js");

const userRouter = require("./routes/user.js");

const app = express();
const port = 8001;

//connection of database
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1').then(()=>console.log("Mongodb Connected")
); 


//Middleware - plugins
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"))


//Routes
app.use("/api/users",userRouter);

 //Rest API

app.listen(port,()=>console.log('Server started !')

);