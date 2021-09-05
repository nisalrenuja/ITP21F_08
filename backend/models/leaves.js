const mongoose = require("mongoose");

//changed
const leavesSchema = new mongoose.Schema({
    //declare variables/properties
    leave_id: {
        type:String,
        required:true,//since must have
        unique:true
    },
    emp_id: {
        type:String,
        required:true,//since must have
    },
    emp_name: {
        type: String,
        required: false,
    },
    leave_type: {
        type: String,
        required: false,
    },
    
    //leave dates
    leave_date: [
        {
            type: Date,
            required: false,
        }
    ],

    no_of_leaves: {
        type: Number,
        required: false,
    },
    leave_message: {
        type: String,
        required: false,
    },
    leave_status: {
        type: String,
        required: false,
    },

});

module.exports = mongoose.model("leaves", leavesSchema);