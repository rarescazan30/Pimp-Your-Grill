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
    telephone: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
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

module.exports = User;
    