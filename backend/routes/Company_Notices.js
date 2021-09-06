const express = require('express');
const Notices = require('../models/Company_Notices');

const router = express.Router();

//Save posts

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

module.exports = router;