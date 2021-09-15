const mongoose = require("mongoose");

const salariesSchema = new mongoose.Schema({
    //declare variables/properties
    salaryno: {
        type:String,
        required:true,//since must have
        unique:true
    },
    empno: {
        type:String,
        required:true//since must have
    },
    name: {
        type: String,
        required: false,
    },
    pay_month: {
        type: String,
        required:true//since must have
    },
    basic: {
        type: Number,
        required: false,
    },
    OT_rate: {
        type: Number,
        required: false,
    },
    OT_hrs: {
        type: Number,
        required: false,
    },
    total_OT: {//must auto calculted
        type: Number,
        required: false,
    },

//extra earnings
/*
    earnings: [{
        
        earn_reason: {type: String, required: false,},
        earn_amount: {type: Number,required: false,},

    }],
*/
    total_earnings: {//must auto calculated
        type: String,
        required: false,
    },

//deductions
/*
    deductions: [{

        deduct_reason: {type: String, required: false,},
        deduct_amount: {type: Number, required: false,},
    }],
*/
    total_deductions: {//must be auto calculted
        type: String,
        required: false,
    },

    net_salary: {//must be auto calculated
        type: String,
        required: false,
        default: 0,
    },
    salary_status: {
        type: String,
        required: false,
    },
 

});

module.exports = mongoose.model("salaries", salariesSchema);


