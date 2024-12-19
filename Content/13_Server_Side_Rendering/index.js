const express = require("express");
const URL = require("./models/url")
const path = require("path");
const staticRoute = require("./routes/staticRouter")

const urlRoute = require("./routes/url")
const {mongoDBConnect}=require("./connection")

const app = express();
const PORT = 8001;

app.set("view engine", "ejs")
app.set('views', path.resolve("./views"))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))




app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get('/url/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory:{
            timestamp: Date.now(),
        }
    }});

    
        res.redirect(entry.redirectURL);
    
       
    
})

mongoDBConnect("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("MongoBD connected Successfully")) 

//middleware


app.listen(PORT, ()=> console.log(`Server started at port: ${PORT}`))
