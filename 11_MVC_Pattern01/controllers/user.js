const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allUsers = await User.find({});
    return res.json(allUsers);
}

async function handleGetUsersById(req,res){
    const output = await User.findById(req.params.id);
    return res.json(output);
}

async function handleDeleteUsersById
(req,res){
    await User.findByIdAndDelete(req.params.id);
    return res.json({msg:"Success"})
}

async function handleCreateNewUsers(req,res){
    const body = req.body;
    if(!body|| !body.firstName || !body.lastName || !body.pincode||!body.email){
        return res.status(400).json({msg:"All fields are required"})
    }

    const result = await User.create({
        firstName : body.firstName,
        lastName : body.lastName,
        pincode : body.pincode,
        email : body.email

    })
    console.log(result);

    return res.status(201).json({msg:"Success"})
}



module.exports={
    handleGetAllUsers,
    handleGetUsersById,
    handleDeleteUsersById,
    handleCreateNewUsers
}