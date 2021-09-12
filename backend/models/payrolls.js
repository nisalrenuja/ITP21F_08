//total_estimated_salary, date_collected
const mongoose = require("mongoose");


const payrollsSchema = new mongoose.Schema({
    //declare variables/properties
    empno: {
        type:Number,
        required:[true, "employee id is required"],
        unique:true,
        
    },
    name: {
        type: String,
        required: [true, "employee name is required"],
    },
    position: {
        type: String,
        required:[true, "posiition is required"],
    },
    bank: {
        type: String,
        required:[true, "bank name is required"],
    },
    bank_branch: {
        type: String,
        required: [true, "bamk branch is required"],
    },
    account_no: {
        type: String,
        required:[true, "account no is required"],
        unique:true,
    },
    basic_salary: {
        type: Number,
        required:[true, "basic salary is required"],
    },
    salary_date: {
        type: Date,
        required:[true, "Pay date is required"],
    },

});

module.exports = mongoose.model("payrolls", payrollsSchema);