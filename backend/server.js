require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const bodyParser = require("body-parser");
const cors = require("cors");
//connect db
connectDB();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.get("/", (req, res, next) => {
  res.send("Api running");
});

//import routes
const postRoutes = require("./routes/staffs");

//app middleware
app.use(bodyParser.json());
app.use(cors());

// Connecting Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use(postRoutes);


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
