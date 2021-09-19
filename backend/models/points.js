const mongoose = require("mongoose");

const points_Schema = new mongoose.Schema({
  _id: {
    type: String,
    required: false,
  }, 
  empno: {
    type: Number,
    required: false,
  }, 
  points:{
    type: Number,
    required: false,
  },
  date_saved:{
    type: String,
    required: false,
  } 
});

module.exports = mongoose.model("points", points_Schema);
