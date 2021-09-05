require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");
//connect db
connectDB();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.get("/", (req, res, next) => {
  res.send("Api running");
});

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

//import routes
const attendancesRoutes = require("./routes/attendances");
const leavesRoutes = require("./routes/leaves");

//add routes here
app.use(attendancesRoutes);
app.use(leavesRoutes);




// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
