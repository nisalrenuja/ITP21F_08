const mongoose = require("mongoose");


//changed
const attendancesSchema = new mongoose.Schema({
    //declare variables/properties
   
    empno: {
        type: Number,
        required:true,
    },
    att_date: {
        type: Date,
        required:true,
    },
    att_type: {
        type: String,
        required:true,
    },
    location_type: {
        type: String,
        required:false,
  
    },
    location: {
        type: String,
        required:false,
  
    },
    time_in: {
        type: String,
        required:false,
    },
    time_out: {
        type: String,
        required:false,
    },
    


},


);

module.exports = mongoose.model("attendances", attendancesSchema);