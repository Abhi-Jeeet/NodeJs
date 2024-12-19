const express = require("express");
const {mongoDBConnect} = require("./connection")
const UserRouter = require("./routes/user")

const app = express();
const PORT = 8001;

mongoDBConnect("mongodb://127.0.0.1:27017/project-2").then(()=>console.log("MongoDB Connected Successfully"))

//middleware
app.use(express.urlencoded({extended:false}));

app.use("/users/details", UserRouter)




app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`))