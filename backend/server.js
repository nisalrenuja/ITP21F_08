require("dotenv").config({ path: "./config.env" });
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const assignment_assignedtostaffRoutes = require("./routes/assignment_assignedtostaff");

//connect db
connectDB();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.get("/", (req, res, next) => {
  res.send("Api running");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //app middleware
// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use(assignment_assignedtostaffRoutes);

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
