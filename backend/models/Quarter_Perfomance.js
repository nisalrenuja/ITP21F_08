const mongoose = require('mongoose');

const Quarter_Performance_Schema = new mongoose.Schema({
  
    quarter_name:{
      type: String,
      required: true,
    },
    year:{
      type: Number,
      required: true,
    },

    quarter_no:{
      type: Number,
      required: true,
    },

    
    from:{
      type:Date,
      required: true,
    },

    to:{
      type:Date,
      required: true,
    },
    approved_reports:{
      type: Number,
      required: true, 
    }
});

    
module.exports = mongoose.model('Quarter_Performance', Quarter_Performance_Schema);