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
    rank1:{
      type: Number,
      required: true
    },
    top_empid1:{
      type: String,
      required: true
    },
    top_empname1:{
      type: String,
      required: true
    },
    total_points1:{
      type: Number,
      required: true 
    },
    rank2:{
      type: Number,
      required: false
    },
    top_empid2:{
      type: String,
      required: false
    },
    top_empname2:{
      type: String,
      required: false
    },
    total_points2:{
      type: Number,
      required: false 
    },
    rank3:{
      type: Number,
      required: false
    },
    top_empid3:{
      type: String,
      required: false
    },
    top_empname3:{
      type: String,
      required: false
    },
    total_points3:{
      type: Number,
      required: false 
    }
});

    
module.exports = mongoose.model('Top_Performers', top_Performers_Schema);