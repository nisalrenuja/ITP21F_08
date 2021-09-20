const mongoose = require("mongoose");

const salariesSchema = new mongoose.Schema({
    //declare variables/properties
    /*salaryno: {
        type:String,
        required:true,//since must have
        //unique:true
    },*/
    empno: {
        type:Number,
        required:true//since must have
    },
    name: {
        type: String,
        required: true,
    },
    pay_month: {
        type: String,
        required:true,//since must have
    },
    basic: {
        type: Number,
        required: true,
    },
    OT_rate: {
        type: Number,
        required: true,
    },
    OT_hrs: {
        type: Number,
        required: true,
    },
    total_OT: {//must auto calculted
        type: Number,
        required: true,
    },

//extra earnings
/*
    earnings: [{
        
        earn_reason: {type: String, required: false,},
        earn_amount: {type: Number,required: false,},

    }],
*/
    total_earnings: {//must auto calculated
        type: Number,
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
        type: Number,
        required: false,
    },

    net_salary: {//must be auto calculated
        type: Number,
        required: false
    },
    salary_status: {
        type: String,
        required: false,
    },
 

});

module.exports = mongoose.model("salaries", salariesSchema);


