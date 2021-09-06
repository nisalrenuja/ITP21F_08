// client
const mongoose = require("mongoose");

const client_Schema = new mongoose.Schema({
    clientno: {
        type: String,
        unique: true,
        required: true,
      },
      clientName: {
        type: String,
        required: true,
      },
      org_type: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      tel_no: [
        { tag:"contact 1",
          type: String,
          required: true,
        },
        { tag:"contact 2",
          type: String,
          required: true,
        }
      ],
      affiliated_comp_name: [{
        type: String,
        required: true,
      }],
     
      
      dirname: {
        type: String,
        required: true,
      },

      dirtel: {
        type: String,
        required: true,
      },

      dirtemail: {
        type: String,
        required: true,
      },

      position: {
        type: String,
        required: true,
      },





      address: {
        type: String,
        required: true,
      },
      added_date: {
        type: String,
        required: true,
        
      },
      tex_fee: {
        type: String,
        required: true,
      },
      business_status: {
        type: String,
        required: true,
      },

      final_report_issured_on: {
        type: String,
        required: true,
      },

      commencement_date: {
        type: String,
        required: true,
      },

      audit_fee: {
        type: String,
        required: true,
      },

      date_paid: {
        type: String,
        required: true,
      },

      report_period: {
        type: String,
        required: true,
      },

});

module.exports = mongoose.model("client",client_Schema);





