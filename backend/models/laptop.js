const mongoose = require("mongoose");

const laptop_Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  storage_type: {
    type: String,
    required: true,
  },
  purchaase_date: {
    type: String,
    
  },
  purchase_price: {
    type: String,
    
  },
  status: {
    type: String,
    required: true,
  },
  discarded_reason: {
    type: String,
    
  },
  discarded_date: {
    type: String,
    
  },
  update_partner_id: {
    type: String,
    
  },
  

});
module.exports = mongoose.model("laptop",laptop_Schema);

