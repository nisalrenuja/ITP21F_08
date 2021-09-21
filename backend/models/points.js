const mongoose = require("mongoose");

const points_Schema = new mongoose.Schema({
  
  empno: {
    type: Number,
    required: false,
  }, 
  points:{
    type: Number,
    required: false,
  },
  date_saved:{
    type: Date,
    required: false,
  } 
});

module.exports = mongoose.model("points", points_Schema);
