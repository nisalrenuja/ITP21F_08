// client
const mongoose = require("mongoose");

const clients_Schema = new mongoose.Schema({
      clientID: 
      {
        type: String,
        unique: true,
        required: true,
      },
      company_name:
      {
        type: String,
        required: true,
      },
      comp_address: 
      {
        type: String,
        required: true,
      },
      email: 
      {
        type: String,
        required: true,
      },
      tel_no: 
      {
         type: Number,
          required: true,
      },
      audit_fee: 
      {
          type: Number,
          required: true,
      },
      dirname: 
      {
        type: String,
        required: true,
      },
      dirtel:  
      {
        type: Number,
        required: true,
      },
      dirtemail:
      {
        type: String,
        required: true,
      },
      position: 
      {
        type: String,
        required: true,
      },
      added_date: 
      {
        type: Date,
        
      },
});

module.exports = mongoose.model("clients",clients_Schema);





