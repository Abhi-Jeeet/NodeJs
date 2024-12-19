const User = require("../models/user");
const {v4:uuidv4} = require("uuid")
const{setUser} = require("../service/auth")

async function handleUserSignup(req, res, next){
    const {fullname, email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.render('signup');
        }
        const newUser = await User.create({fullname, email, password});
        return res.redirect('/')
    }
    catch(error){
        console.log(error);
        
    }
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email, password});

    if(!user){
        return res.render("login",{
            error: "Invalid Username or Password"
        });

    }
    
    const token = setUser( user);
    res.cookie("uid", token);
    return res.redirect("/")
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}