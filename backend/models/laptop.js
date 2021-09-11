const mongoose = require("mongoose");
//laptop backend db
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
    required: false,
    
  },
  purchase_price: {
    type: String,
    required:false,
    
  },
  status: {
    type: String,
    required: true,
  },
  discarded_reason: {
    type: String,
    required:false,
    
  },
  discarded_date: {
    type: String,
    required:false,
    
  },
  update_partner_id: {
    type: String,
    required:false,
    
  },
  

});
module.exports = mongoose.model("laptop",laptop_Schema);

