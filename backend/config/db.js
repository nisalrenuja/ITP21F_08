const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURL");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);

    //Exit Process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
