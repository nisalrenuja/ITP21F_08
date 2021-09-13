const express = require('express');
const QuarterPerformance = require('../models/Quarter_Performace');

const router = express.Router();

//Save Performance

router.post("/performance/save", (req, res) => {
    let newPost = new Posts(req.body);
  
    newPost.save((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Posts saved successfully",
      });
    });
  });

//Get Perfomance

router.get("/performance", (req, res) => {
    Posts.find().exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        existingPosts: posts,
      });
    });
  });


module.exports = router;