const mongoose = require("mongoose");

const laptop_repair_date_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  repair_date: {
    type: Date,
    required: true,
  },
 
  

});
module.exports = mongoose.model("laptop_repair_date", laptop_repair_date_Schema);

