const express = require('express');
const Performance = require('../models/Quarter_Performance');

const router = express.Router();

//Save Performance

router.post("/performance/save", (req, res) => {
    let newPerformance = new Performances(req.body);
  
    newPerformance.save((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Performances saved successfully",
      });
    });
  });

//Get Perfomance

router.get("/performance", (req, res) => {
    Performances.find().exec((err, Performances) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: true,
        Performances: Performances,
      });
    });
  });


  //get specific Performance
router.get("/performance/:id", (req,res) =>{
  let quarter_name = req.params.id;

  Performances.findById(quarter_name, (err, Performances) =>{
      if (err){
          return res.status(400).json({
              success: false,
              err,
          });
      }
      return res.status(200).json({
          success: true,
          payroll
      });
  });
});


//Update Performances

router.put('/performance/update/:id', (req,res)=>{
  Performances.findByIdAndUpdate(
      req.params.id,
      {
          $set:req.body
      },
      (err,post)=>{
          if(err){
              return res.status(400).json({error:err});
          }
          return res.status(200).json({
              success:"Performance Updated Successfully"
          });
      }
  );
});

//Delete Performances

router.delete('/performance/delete/:id',(req,res) =>{
  Performances.findByIdAndRemove(req.params.id).exec((err,deletedPerformance) =>{

      if(err) return res.status(400).json({
          message:"Delete Unsuccessful",err
      });

      return res.json({
          message:"Delete Successful",deletedPerformance
      });
  });
});




module.exports = router;