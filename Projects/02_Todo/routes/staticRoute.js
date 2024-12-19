const express= require("express");
const todo = require("../models/todo");
const User = require("../models/user")


const router = express.Router();



router.get('/', async (req,res)=>{
    if(!req.user) return res.redirect('/login')
    const allTitle = await todo.find({createdBy:req.user._id})
    return res.render("home",{
        titles:allTitle,
    })
})
router.get('/signup', async(req,res)=>{
    return res.render("signup")
})

router.get('/login', async (req,res)=>{
    return res.render("login")
})



module.exports = router;