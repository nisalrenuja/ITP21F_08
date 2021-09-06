//client_fees 
const mongoose = require("mongoose");

const client_fees_Schema = new mongoose.Schema({
    invoiceno: {
        type: String,
        unique: true,
        required: true,
      },
      comp_name: {
        type: String,
        required: true,
      },
      month: {
        type: String,
        required: true,
      },
      audit_fee: {
        type: String,
        required: true,
      },
       total: {
        type: String,
        required: true,
      },
      fees_status: {
        type: String,
        required: true,
      },
      date_paid: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("client_fees",client_fees_Schema);