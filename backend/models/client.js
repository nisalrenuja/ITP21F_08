// client
const mongoose = require("mongoose");

const client_Schema = new mongoose.Schema({
        clientID: {
        type: String,
        unique: true,
        required: true,
      },
      company_name: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      added_date: {
        type: String,
        required: true,
        
      },
      status: {
        type: String,
        required: true,
      },

});

module.exports = mongoose.model("client",client_Schema);





