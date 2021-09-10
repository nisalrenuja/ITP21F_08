//total_estimated_salary, date_collected
const mongoose = require("mongoose");


const payrollsSchema = new mongoose.Schema({
    //declare variables/properties
    empno: {
        type:String,
        required:true//since must have
    },
    name: {
        type: String,
        required: false,
    },
    position: {
        type: String,
        required: false,
    },
    bank: {
        type: String,
        required: false,
    },
    bank_branch: {
        type: String,
        required: false,
    },
    account_no: {
        type: String,
        required: false,
    },
    basic_salary: {
        type: Number,
        required: false,
    },
    salary_date: {
        type: Date,
        required: false,
    },

});

module.exports = mongoose.model("payrolls", payrollsSchema);