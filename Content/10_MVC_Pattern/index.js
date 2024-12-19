const express = require("express");
const userRouter = require('./routes/user')
const {connectMongoDb} = require("./connection")

const app = express();
const PORT = 8000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/project-1").then(()=> console.log("MongoDB connected"))

//middleware
app.use(express.urlencoded ({extended:false}))



app.use("/api/users", userRouter);

app.listen(PORT, ()=>console.log(`Server Started at ${PORT}`))