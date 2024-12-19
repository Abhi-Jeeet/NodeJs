const todo = require("../models/todo");
const User = require("../models/user")

async function handleAddEntry(req,res){
    const body = req.body;

    if(!body.title || body.title.trim() === ""){
        return res.redirect("/")       
        
    }


    const result =await todo.create({
        title:body.title,
        createdBy:req.user._id,
    })
    return res.redirect('/')
      
}

async function handleDeleteEntry(req,res){
    const delId = req.params.id;
    await todo.findByIdAndDelete(delId);
    return res.redirect('/')
}

async function handleUpdateEntry(req, res){
    const updateId = req.params.id;
    const updateData = req.body;
    const result = await todo.findByIdAndUpdate(updateId, updateData,{new:true});
    return res.redirect('/')
}





module.exports = {
    handleAddEntry,
    handleDeleteEntry,
    handleUpdateEntry,
    
}