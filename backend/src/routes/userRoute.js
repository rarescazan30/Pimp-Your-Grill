const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {

    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
  router.post("/register", async (req, res) => {
    try {
      const { username, email, password, telephone, name, surname, age } = req.body;

      const existingUser = await User.findOne({email});
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = crypto.randomBytes(32).toString("hex");
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        telephone,
        name,
        surname,
        age,
        verificationToken: token,
        isVerified: false,
      });

      await newUser.save();

      const url = 'http://localhost:5001/api/users/verify/' + token;
      await transporter.sendMail({
        to : email,
        subject : "Verify your email",
        html : `Click <a href="${url}">here</a> to verify your email.`
      });
      res.status(201).json({ message: "User registered. Please check your email to verify your account." });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  router.get("/verify/:token", async (req, res) => {
    try {
      const {token} = req.params;
      const user = await User.findOne({verificationToken: token});
      if (!user) return res.status(400).json({message: "Invalid token"});
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
      res.json({message: "Email verified successfully. You can now log in."});

    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email before logging in." });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          telephone: user.telephone,
          name: user.name,
          surname: user.surname} });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;
