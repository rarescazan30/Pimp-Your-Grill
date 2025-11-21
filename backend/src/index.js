// backend entry point

const express = require("express"); // express framework to create a backend server
const connectDB = require("./db");
const cors = require("cors");


const app = express();
connectDB(); // connect to the database
const userRoutes = require("./routes/userRoute");
const grillRoutes = require("./routes/grillRoute");
app.use(cors());
app.use(express.json()); 
// express.json() is middleware that allows the server to parse json
// this is required to read data sent from react
app.use("/api/users", userRoutes);
app.use("/api/grills", grillRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // When you run 'node src/index.js', you should see this message
  // indicating the backend is live and ready to accept requests
});

