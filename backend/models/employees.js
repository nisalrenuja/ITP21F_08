const mongoose = require("mongoose");

const employees_Schema = new mongoose.Schema({
  empno: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: false,
  },
  dob:{
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  nic_no: {
    type: String,
    required: false,
  },
  permernant_address:{
    type: String,
    required: false,
  },
  district:{
    type: String,
    required: false,
  },
  province:{
    type: String,
    required: false,
  },
  place_of_stay:{
    type: String,
    required: false,
  },
  organization:{
    type: String,
    required: false,
  },
  sector: {
    type: String,
    required: false,
  },
  duration:{
    type: String,
    required: false,
  },
  commencement_date: {
    type: Date,
    required: false,
  },
  ending_date: {
    type: Date,
    required: false,
  },  
  professional_education:{
    type: String,
    required: false,
  },
  completed_stage:{
    type: String,
    required: false,
  },
  current_stage:{
    type: String,
    required: false,
  },
  attempt:{
    type: String,
    required: false,
  },
  subjects:{
    type: String,
    required: false,
  },
  al_year :{
    type: Number,
    required: false,
  },
  university:{
    type: String,
    required: false,
  },
  graduated_yr:{
    type: Number,
    required: false,
  },
  department:{
    type: String,
    required: false,
  }, 
  points:{
    type: String,
    required: false,
  },
  type:{
    type: String,
    required: false,
  },
  status:{
    type: String,
    required: true,
  },
  old_password:{
    type: String,
    required: false,
  },
  new_password:{
    type: String,
    required: false,
  },
  confirm_password:{
    type: String,
    required: false,
  }

});

module.exports = mongoose.model("employees", employees_Schema);
