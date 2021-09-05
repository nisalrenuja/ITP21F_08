//write http requests
//not changed
const express = require("express");
const Attendances = require("../models/attendances");

const router = express.Router();

//mark attendance (POST)
router.post("/attendance/save", (req, res) => {
    let newAttendance = new Attendances(req.body);
  
    newAttendance.save((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Successfully marked the attendance!!",
      });
    });
  });


//get attendance table (GET)
router.get("/attendances", (req, res) => {
  Attendances.find().exec((err, attendances) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingAttendances: attendances,
    });
  });
});

//get a specific attendance (GET)
router.get("/attendance/:att_id", (req, res) =>{
  let attendanceId = req.params.att_id;

  Attendances.findById(postId, (err, attendance) =>{
    if(err){
      return res.status(400).json({
        success: false,
        err,
      });
    } 
    return res.status(200).json({
      success: true,
      attendance
    }); 
  });
});


//update post (PUT)
router.put("/attendance/update/:att_id", (req, res) => {
  Attendances.findByIdAndUpdate(
    req.params.att_id,
    {
      $set: req.body,
    },
    (err, attendance) => {
      if (err) {
        return res.status(400).json({error: err});
      }
      return res.status(200).json({
        success: "Attendance Successfully Updated!!",
      });
    }
  );
});


//delete post
//since we are deleting a specific post ... need to have an id
router.delete("/attendance/delete/:att_id", (req, res) => {
  Attendances.findByIdAndRemove(req.params.att_id).exec((err, deletedAttendance) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccessful!!", err
      });
    return res.status(200).json({
      message: "Delete Successful!!", deletedAttendance
    });
  });
});
  

module.exports = router;