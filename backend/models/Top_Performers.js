const mongoose = require('mongoose');

const top_Performers_Schema = new mongoose.Schema({
  
    year:{
      type:Number,
      required: false
    },
    month:{
      type:String,
      required: false
    },
    rank1:{
      type: Number,
      required: false
    },
    top_empid1:{
      type: String,
      required: false
    },
    
    total_points1:{
      type: Number,
      required: false 
    },
    rank2:{
      type: Number,
      required: false
    },
    top_empid2:{
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
    
    total_points3:{
      type: Number,
      required: false 
    }
});

    
module.exports = mongoose.model('Top_Performers', top_Performers_Schema);