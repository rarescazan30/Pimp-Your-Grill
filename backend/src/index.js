const express = require("express");
const connectDB = require("./db");
const cors = require("cors");


const app = express();
connectDB();
const userRoutes = require("./routes/userRoute");
const grillRoutes = require("./routes/grillRoute");
app.use(cors());
app.use(express.json()); 
app.use("/api/users", userRoutes);
app.use("/api/grills", grillRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

