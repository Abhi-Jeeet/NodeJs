const express = require("express");

const app =express();

app.get("/", (req,res)=>{
    return res.send("Hello from Home Page")
});

app.get("/about", (req, res)=>{
    return res.send("Hello from about page" + " hey " + req.query.name)
})


app.listen(8001, ()=>console.log("Server Started")
)