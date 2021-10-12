const express = require('express');
const Reports = require('../models/final_report'); 

const router = express.Router();

//save reports

router.post('/final_report/save',(req,res)=>{

    let newReport = new Reports(req.body);

    newReport.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Reports saved successfully"
        });
    });
});

//Count reports of the 1st Quarter
router.get("/finalreport1", (req, res) => {
    Reports.find({
        date_and_time_upload: {
            $gte: "2021-01-01T00:00:00.000Z",
            $lt: "2021-04-01T00:00:00.000Z"
        }
    }).exec((err,finalreport) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            finalreport:finalreport
        });
    });
  });
  
  //Count for the 2nd Quarter
  router.get("/finalreport2", (req, res) => {
    Reports.find({
        date_and_time_upload: {
            $gte: "2021-04-01T00:00:00.000Z",
            $lt: "2021-07-01T00:00:00.000Z"
        }
    }).exec((err,finalreport) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            finalreport:finalreport
        });
    });
  })

  //Count for the 3rd Quarter
  router.get("/finalreport3", (req, res) => {
    Reports.find({
        date_and_time_upload: {
            $gte: "2021-07-01T00:00:00.000Z",
            $lt: "2021-10-01T00:00:00.000Z"
        }
    }).exec((err,finalreport) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            finalreport:finalreport
        });
    });
  })

  //count for the 4th Quarter
  router.get("/finalreport4", (req, res) => {
    Reports.find({
        date_and_time_upload: {
            $gte: "2021-10-01T00:00:00.000Z",
            $lt: "2022-01-01T00:00:00.000Z"
        }
    }).exec((err,finalreport) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            finalreport:finalreport
        });
    });
  })

//Get Reports

router.get('/final_report',(req,res) =>{
    Reports.find().exec((err,finalreport) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            finalreport:finalreport
        });
    });
});


//get specific Reports
router.get("/final_report/:id", (req,res) =>{
    let report = req.params.id;

    Reports.findById(report, (err, finalreport) =>{
        if (err){
            return res.status(400).json({
                success: false,
                err,
            });
        }
        return res.status(200).json({
            success: true,
            finalreport
        });
    });
});


//Update Reports

router.put('/final_report/update/:id', (req,res)=>{

    Reports.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,finalreport)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

//Delete Reports

router.delete('/final_report/delete/:id',(req,res) =>{

    Reports.findByIdAndRemove(req.params.id).exec((err,deletedReport) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });
        return res.json({
            message:"Delete Successful",deletedReport
        });
    });
});

module.exports = router;