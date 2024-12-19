const express = require("express");
const path = require("path")
const { connectMongoDB } = require("./connection");
const cookieParser = require("cookie-parser")
const entryRoute = require("./routes/todo")
const staticRoute = require("./routes/staticRoute")
const userRoute = require("./routes/user");
const {restrictToLoggedinUserOnly, checkAuth} = require("./middlewares/auth")



const app = express();
const PORT = 8001;

//connection
connectMongoDB("mongodb://127.0.0.1:27017/todo-1").then(()=>console.log("MongoDB Connected Successfully"));

//serverside rendering
app.set("view engine", "ejs");
app.set('views', path.resolve("./views"))

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());




app.use("/todo",restrictToLoggedinUserOnly, entryRoute);
app.use("/",checkAuth, staticRoute);
app.use("/user", userRoute);




app.listen(PORT, ()=>console.log(`Server Started at Port ${PORT}`));
