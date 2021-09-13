const express = require('express');
const Notices = require('../models/Company_Notices');

const router = express.Router();

//Save Notices

router.post('/CreateNotice/save', (req,res)=>{

    let newNotice = new Notices(req.body);

    newNotice.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Notice saved successfully"
        });
    });
});

//Get Notices

router.get('/CreateNotices',(req,res) =>{
    Notices.find().exec((err,existingNotices) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingNotices:existingNotices
        });
    });
});

//get specific Notices
router.get("/CreateNotice/:id", (req,res) =>{
    let notice_id = req.params.id;

    Notices.findById(notice_id, (err, existingNotices) =>{
        if (err){
            return res.status(400).json({
                success: false,
                err,
            });
        }
        return res.status(200).json({
            success: true,
            existingNotices
        });
    });
});

//Update Notices

router.put('/CreateNotice/update/:id', (req,res)=>{
    Notices.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err, existingNotices)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Notice Updated Successfully"
            });
        }
    );
});

//Delete Notices

router.delete('/CreateNotice/delete/:id',(req,res) =>{
    Notices.findByIdAndRemove(req.params.id).exec((err,deletedNotice) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });

        return res.json({
            message:"Delete Successful",deletedNotice
        });
    });
});


module.exports = router;