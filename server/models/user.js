const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    avatar: {
        type: String,
        trim: true
    },
    siteWeb: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("User", UserSchema)