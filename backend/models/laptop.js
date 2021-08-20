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
    type: Date,
    required: true,
  },
  purchase_price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  discarded_reason: {
    type: String,
    required: true,
  },
  discarded_date: {
    type: Date,
    required: true,
  },
  update_partner_id: {
    type: String,
    required: true,
  },
  

});
module.exports = mongoose.model("laptop",laptop_Schema);

