const mongoose = require("mongoose");
//laptop
const laptop_repair_cost_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  repair_cost: {
    type: String,
    required: true,
  },
 
  

});
module.exports = mongoose.model("laptop_repair_cost", laptop_repair_cost_Schema);

