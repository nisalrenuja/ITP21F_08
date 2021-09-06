const express = require('express');
const Reports = require('../models/final_report'); 

const router = express.Router();

//save reports

router.post('/post/save',(req,res)=>{

    let newReport = newReports(req.body);

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

module.exports = router
