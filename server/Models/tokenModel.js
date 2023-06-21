import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    userid:{
        type: String,
        trim: true,
        required: true
    }, 
    token:{
        required: true,
        type: String
    }
})

module.exports = mongoose.model("Token", tokenSchema);