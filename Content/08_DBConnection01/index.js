const express = require("express");
const mongoose = require("mongoose");


const { type } = require("os");

const app = express();
const PORT = 8000;

//connection mongoose
mongoose.connect('mongodb://127.0.0.1:27017/project-1')
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required:true,
    },
    lastName:{
        type:String,

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        tyoe: String,
    },
    gender:{
        type:String,
    }
})

//model
const User = mongoose.model("user", userSchema);

//MiddleWare
app.use(express.urlencoded({extended:false}))

app.get('/api/users',async(req,res)=>{
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
})

app
    .route("/api/users/:id")
    .get(async(req, res)=>{
        const user = await User.findById(req.params.id);
        return res.json(user);
    })
    .patch(async(req, res)=>{
        //Edit user with id
        await User.findByIdAndUpdate(req.params.id,{lastName:"changed"})
        return res.json({status:"success"});
    })
    .delete(async(req, res)=>{
        //Delete user with id
        await User.findByIdAndDelete(req.params.id);
        return res.json({status:"success"})
    });
//Routes
app.get("/users", async(req,res)=>{
    const allDBUsers = await User.find({});
    const html = `
    <ul>
     ${allDBUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")}
     </ul>
    `;
    res.send(html);
})     

app.post("/api/users",async(req,res)=>{
    const body = req.body;
    if(
        !body||
        !body.first_name ||
        !body.last_name ||
        !body.email||
        !body.gender||
        !body.job_title
    ){
        return res.status(400).json({msg:"All fields are req..."})
    }
    const result = await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        jobTitle:body.job_title,
        gender:body.gender
    });
    console.log(result);
    
    return res.status(201).json({msg:"Success"})
    
});

app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`)
);
