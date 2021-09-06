//total_estimated_salary, date_collected
const mongoose = require("mongoose");
const { timeStamp } = require("node:console");

const payrollsSchema = new mongoose.Schema({
    //declare variables/properties
    pay_id: {
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
    position: {
        type: String,
        required: false,
    },
    account_no: {
        type: String,
        required: false,
    },
    net_salary: {
        type: String,
        required: false,
    },
    salary_date: {
        type: Date,
        required: false,
    },
    salary_recieve: {
        type: Boolean,
        required: false,
    },
    date_collected: {
        type: Date,
        required: false,
    },


 

});

module.exports = mongoose.model("payrolls", payrollsSchema);