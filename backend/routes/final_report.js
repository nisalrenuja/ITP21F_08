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