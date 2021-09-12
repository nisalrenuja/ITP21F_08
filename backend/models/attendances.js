const mongoose = require("mongoose");


//changed
const attendancesSchema = new mongoose.Schema({
    //declare variables/properties
   
    empno: {
        type: Number,
        required: [true, "employee id is required"],
    },
    att_date: {
        type: Date,
        required: [true, "date is required"],
    },
    att_type: {
        type: String,
        required:[true, "Attendance type is required"],
    },

    
    location_type: {
        type: String,
        required:[true, "location type  is required"],
  
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

    {
        timestamps: true,
    }

);

module.exports = mongoose.model("attendances", attendancesSchema);