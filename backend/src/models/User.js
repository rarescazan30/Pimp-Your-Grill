const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    age: {
        type: Number
    },
});

const User = mongoose.model("User", userSchema);

// we made the model and we export it so other files can use it
module.exports = User;
    