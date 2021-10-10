const mongoose = require("mongoose");

const salariesSchema = new mongoose.Schema({
    //declare variables/properties
    payslipID: {
        type:Number,
        required:true,//since must have
        //unique:true
    },
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

    OT_hrs: {
        type: Number,

    },


    bonus:{
        type: Number,

    },
    aws:{
        type: Number,

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
    
    },

//deductions
/*
    deductions: [{

        deduct_reason: {type: String, required: false,},
        deduct_amount: {type: Number, required: false,},
    }],
*/
    nopay_leaves: {
        type: Number,
    },
    total_deductions: {//must be auto calculted
        type: Number,
      
    },

    net_salary: {//must be auto calculated
        type: Number,
 
    },
    salary_status: {
        type: String,
        required: true,
    },
 

});

module.exports = mongoose.model("salaries", salariesSchema);


