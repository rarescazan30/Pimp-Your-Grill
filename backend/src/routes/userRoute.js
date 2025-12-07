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
      const { token } = req.params;
      const user = await User.findOne({ verificationToken: token });
      
      if (!user) {
          return res.status(400).json({ message: "Invalid token" });
      }
  
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();
  
      res.redirect('http://localhost:5173/email-verified'); 
  
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
          surname: user.surname,
          isAdmin: user.isAdmin} });
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



// http://localhost:5001/api/users/make-admin/your-email@example.com
router.get("/make-admin/:email", async (req, res) => {
  try {
      const user = await User.findOneAndUpdate(
          { email: req.params.email },
          { isAdmin: true },
          { new: true }
      );
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json({ message: `Success! ${user.username} is now an admin.`, user });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
          return res.json({ message: "If that email is registered, a reset link has been sent." });
      }

      const token = crypto.randomBytes(32).toString("hex");
      
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();

      
      const resetLink = `http://localhost:5173/reset-password/${token}`;
      
      await transporter.sendMail({
          to: email,
          subject: "Reset Your Password - Pimp Your Grill",
          html: `<p>You requested a password reset.</p>
                 <p>Click <a href="${resetLink}">here</a> to set a new password.</p>
                 <p>This link expires in 1 hour.</p>`
      });

      res.json({ message: "Check your email for the reset link." });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
      const { token, newPassword } = req.body;

      const user = await User.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
          return res.status(400).json({ message: "Token is invalid or has expired." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      

      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      
      await user.save();

      res.json({ message: "Password updated successfully! You can now log in." });

  } catch (error) {
      res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
