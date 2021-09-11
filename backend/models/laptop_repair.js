const mongoose = require("mongoose");
//laptop_repair db
const laptop_repair_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  repair_reason: {
    type: String,
    required: true,
  },
  repair_date: {//edited
    type: String,
    required: false,
  },
  repair_cost: {
    type: String,
    required: false,
  },

  
  

});
module.exports = mongoose.model("laptops_repair", laptop_repair_Schema);

