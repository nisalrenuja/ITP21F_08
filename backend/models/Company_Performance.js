const mongoose = require('mongoose');

const company_Performers_Schema = new mongoose.Schema({
  
    notice_comp_id:{
      type: String,
      required: true,
    },
    total_employees:{
      type: Number,
      required: true,
    },
    year:{
      type: Number,
      required: true,
    },
    quarter:{
      type: String,
      required: true, 
    }
});

    
module.exports = mongoose.model('Company_Performance', company_Performers_Schema);