const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    userid: {
        type: String,
        trim: true,
        required: true
    },
    token: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true
})

const Token = mongoose.model('token', tokenSchema)

module.exports = Token