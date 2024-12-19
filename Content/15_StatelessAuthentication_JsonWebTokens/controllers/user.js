const {v4: uuidv4} = require('uuid')
const User = require("../models/user");
const{setUser} = require('../service/auth')

async function handleUserSignup(req, res){
    const {name, email, password} = req.body;
    //inserted in DB
    await User.create({
        name, email, password
    });

    return res.redirect("/");
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    //Finding in DB
    const user = await User.findOne({email,password});
    if(!user) return res.render("login",{
        error:"Invalid Username and password"
    });

  
    const token = setUser( user);
    res.cookie("uid", token);
    return res.redirect("/");
}


module.exports ={
    handleUserSignup,
    handleUserLogin,
}