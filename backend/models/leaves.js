const mongoose = require("mongoose");

//changed
const leavesSchema = new mongoose.Schema({
    //declare variables/properties
    empno: {
        type:String,
        required:true,//since must have
    },
    name: {
        type: String,
        required: false,
    },
    leave_type: {
        type: String,
        required: false,
    },
    
    //leave dates
    leave_start_date: {
        type: Date,
        required: false,
    },
    leave_end_date: {
        type: Date,
        required: false,
    },

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