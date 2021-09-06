const mongoose = require('module');

const company_notices_Schema = new mongoose.Schema({
  
    notice_id:{
      type: String,
      required: true,
  },
  notice_topic:{
      type: String,
      required: true,
  },
  notice_details:{
      type: String,
      required: true,
  },
  published_date:{
      type: Date,
      required: true,
  },
  uploaded_emp_id:{
      type: String,
      required: true, 
  }
});

module.exports = mongoose.model('Company_Notices', company_notices_Schema);