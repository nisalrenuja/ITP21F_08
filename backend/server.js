require("dotenv").config({ path: "./config.env" });
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const cors = require("cors");
const laptop_routes = require("./routes/laptop");
const laptop_repair_routes = require("./routes/laptopRepair");
const assignment_assignedtostaffRoutes = require("./routes/assignment_assignedtostaff");
const laptop_assignment_Routes = require("./routes/laptop_assignment");
const employees = require("./routes/employees");
//connect db
connectDB();
const postRoutes = require("./routes/Reviews");
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.get("/", (req, res, nenpmxt) => {
  res.send("Api running");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //app middleware
// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

app.use(laptop_routes);
app.use(laptop_repair_routes);
app.use(assignment_assignedtostaffRoutes);
app.use(laptop_assignment_Routes);
app.use(employees);
app.use(postRoutes);
//import routes
const attendancesRoutes = require("./routes/attendances");
const leavesRoutes = require("./routes/leaves");
const final_report = require("./models/final_report");

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
