const mongoose = require("mongoose");
const { timeStamp } = require("node:console");

const salariesSchema = new mongoose.Schema({
    //declare variables/properties
    salary_id: {
        type:String,
        required:true,//since must have
        unique:true
    },
    emp_id: {
        type:String,
        required:true//since must have
    },
    emp_name: {
        type: String,
        required: false,
    },
    pay_month: {
        month:String,
        year: Number,
        required:true//since must have
    },
    rate_per_daye: {
        type: Number,
        required: false,
    },
    days_present: {
        type: Number,
        required: false,
    },
    noOf_pay_leaves: {
        type: Number,
        required: false,
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
    earnings: [{
        
        earn_reason: {type: String, required: false,},
        earn_amount: {type: Number,required: false,},

    }],

    total_earnings: {//must auto calculated
        type: String,
        required: false,
    },

//deductions
    deductions: [{

        deduct_reason: {type: String, required: false,},
        deduct_amount: {type: Number, required: false,},
    }],
    total_deduction: {//must be auto calculted
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


