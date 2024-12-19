const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})

const todo = mongoose.model("entry", entrySchema)

module.exports = todo;