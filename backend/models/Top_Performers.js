const mongoose = require('mongoose');

const top_Performers_Schema = new mongoose.Schema({
  
    /*notice_top_id:{
      type: String,
      required: true,
    },*/
    year:{
      type:Number,
      required: true
    },
    month:{
      type:String,
      required: true
    },
    rank:{
      type: Number,
      required: true,
    },
    top_empid:{
      type: String,
      required: true,
    },
    top_empname:{
      type: String,
      required: true
    },
    designation:{
      type: String,
      required: true,
    },
    total_points:{
      type: Number,
      required: true, 
    }
});

    
module.exports = mongoose.model('Top_Performers', top_Performers_Schema);