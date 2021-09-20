const mongoose = require('mongoose');

const company_notices_Schema = new mongoose.Schema({
  
    notice_id:{
      type: String,
      required: true,
    },
    emp_id:{
        type: String,
        required:true,
    },
    emp_name:{
      type: String,
      required:true,
    },
    notice_topic:{
      type: String,
      required: true,
    },
    notice_content:{
      type: String,
      required: true,
    },
    notice_attachments:{
        type: Object,
    },
   published_date:{
      type: Date,
      required: true
      
   },
  
});

module.exports = mongoose.model('Company_Notices', company_notices_Schema);