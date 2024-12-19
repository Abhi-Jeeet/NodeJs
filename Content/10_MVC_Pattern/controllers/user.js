const User = require("../models/user");

async function handleGetAllUsers(req, res){
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}

async function handleGetUsersById(req,res){
    const user = await User.findById(req.params.id);
    return res.json(user);
}

async function handleUpdateUsersById(req,res){
    await User.findByIdAndDelete(req.params.id,{lastNams:"Changed"})
    return res.json({status:"success"});
}

async function handleDeleteUsersById(req, res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"})
}

async function handleCreateNewUser(req, res){
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
}



module.exports = {
    handleGetAllUsers,
    handleGetUsersById,
    handleUpdateUsersById,
    handleDeleteUsersById,
    handleCreateNewUser,
}