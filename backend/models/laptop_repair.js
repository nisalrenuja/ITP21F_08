const mongoose = require("mongoose");

const laptop_repair_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  repair_reason: {
    type: String,
    required: true,
  },
  
  

});
module.exports = mongoose.model("laptops_repair", laptop_repair_Schema);

