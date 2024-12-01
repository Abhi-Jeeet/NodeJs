const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8001;

//connection mongoose
mongoose.connect("mongodb://127.0.0.1:27017/project-2")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log("Mongo Error", err))

//schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type: String,

    },
    pincode:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        unique:true,
    }
});

//model
const User = mongoose.model("userDetails", userSchema);//userDetails -> collections

//Middleware
app.use(express.urlencoded({extended:false}))

app.get("/api/users/details", async(req,res)=>{
    const allUsers = await User.find({});
    return res.json(allUsers);
})

app.get("/users/details", async(req, res)=>{
    const allUsers = await User.find({});
    const html = `
    <ul>
    ${allUsers.map((user)=>`<li>${user.firstName}${user.lastName}  - ${user.pincode} - ${user.email}`).join("")}
    </ul>
    `;
    res.send(html);
});

app
    .route("/api/users/details/:id")
    .get(async(req, res)=>{
        const ouput = await User.findById(req.params.id);
        return res.json(ouput);
    })
    .delete(async(req, res)=>{
        await User.findByIdAndDelete(req.params.id);
        return res.json({msg:"success"});
    })

app.post("/users/entry", async(req, res)=>{
    const body = req.body;
    if(!body|| !body.firstName|| !body.lastName|| !body.pincode||!body.email){

        return res.status(400).json({msg:"All fields are req..."})
    }
    const result = await User.create({
        firstName : body.firstName,
        lastName : body.lastName,
        pincode : body.pincode,
        email: body.email

    })
    console.log(result);
    

    return res.status(201).json({msg:"success"})

})




app.listen(PORT, ()=>console.log(`Server Started at ${PORT}`))