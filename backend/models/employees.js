const mongoose = require("mongoose");

const employees_Schema = new mongoose.Schema({
  empno: {
    type: String,
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
    required: true,
  },
  dob:{
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  nic_no: {
    type: String,
    required: true,
  },
  permernant_address:{
    type: String,
    required: true,
  },
  district:{
    type: String,
    required: true,
  },
  province:{
    type: String,
    required: true,
  },
  place_of_stay:{
    type: String,
    required: true,
  },
  organization:{
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  duration:{
    type: String,
    required: true,
  },
  commencement_date: {
    type: Date,
    required: true,
  },
  ending_date: {
    type: Date,
    required: true,
  },  
  professional_education:{
    type: String,
    required: true,
  },
  completed_stage:{
    type: String,
    required: true,
  },
  current_stage:{
    type: String,
    required: true,
  },
  attempt:{
    type: String,
    required: true,
  },
  subjects:{
    type: String,
    required: true,
  },
  al_year :{
    type: Number,
    required: true,
  },
  university:{
    type: String,
    required: true,
  },
  graduated_yr:{
    type: Number,
    required: true,
  },
  department:{
    type: String,
    required: true,
  }, 
  type:{
    type: String,
    required: true,
  },
  status:{
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("employees", employees_Schema);
