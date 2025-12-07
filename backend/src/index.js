const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); 

dotenv.config();
const app = express();

connectDB();

const userRoutes = require("./routes/userRoute");
const grillRoutes = require("./routes/grillRoute");

app.use(cors());

app.use(express.json({ limit: '50mb' })); 

app.use("/api/users", userRoutes);
app.use("/api/grills", grillRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});