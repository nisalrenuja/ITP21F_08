const express = require('express');
const Notices = require('../models/Company_Notices');

const router = express.Router();

//Save Notices

router.post('/post/save', (req,res)=>{

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

router.get('/post',(req,res) =>{
    Notices.find().exec((err,post) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingNotices:post
        });
    });
});

//Update Notices

router.put('/post/update/:notice_id', (req,res)=>{
    Notices.findByIdAndUpdate(
        req.params.notice_id,
        {
            $set:req.body
        },
        (err,post)=>{
            if(err){
                return res.status(400).json({error:err});
            }
            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});

//Delete Notices

router.delete('/post/delete/:notice_id',(req,res) =>{
    Notices.findByIdAndRemove(req.params.notice_id).exec((err,deletedNotice) =>{

        if(err) return res.status(400).json({
            message:"Delete Unsuccessful",err
        });

        return res.json({
            message:"Delete Successful",deletedNotice
        });
    });
});


module.exports = router;