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
  Attendances.find().sort({ "att_date": -1 }).exec((err, attendances) => {
    var acount = attendances.length;
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingAttendances: attendances,
      attendanceCount:acount
    });
  });
});

//get a specific attendance (GET)
router.get("/attendance/:id", (req, res) =>{
  let attendanceId = req.params.id;

  Attendances.findById(attendanceId, (err, attendance) =>{
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

//Get type in company attendances for the report
router.get("/attendances/incompany", (req, res) => {  
  Attendances.find({type : { $eq: "In Company" }}).sort({ "empno": -1 }).exec((err, attendances) => { 
    var acount = attendances.length;
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        existingAttendances: attendances,
        attendanceCount:acount
     })     
    });
});

//Get type assignment attendances for the report
router.get("/attendances/assignlocation", (req, res) => {  
  Attendances.find({type : { $eq: "Assignment Loctation" }}).sort({ "empno": -1 }).exec((err, attendances) => { 
    var acount = attendances.length;
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        existingAttendances: attendances,
        attendanceCount:acount
     })     
    });
});

//Get the count of employees based on Type in company and assignment location
router.get("/attendances/counts", (req, res) => {  
  Attendances.find({type : { $eq: "In Comany" }}).count().exec((err, incompany) => { Attendances.find({type : { $eq: "Assignment Loaction" }}).count().exec((err, assignlocation) => { 
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        incompanycount: incompany,
        assignloactioncount: assignloaction,
     })     
    });
    });
});




//update post (PUT)
router.put("/attendance/update/:id", (req, res) => {
  Attendances.findByIdAndUpdate(
    req.params.id,
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
router.delete("/attendance/delete/:id", (req, res) => {
  Attendances.findByIdAndRemove(req.params.id).exec((err, deletedAttendance) => {
    if (err)
      return res.status(400).json({
        message: "Attendance Record Delete Unsuccessful!!", err
      });
    return res.status(200).json({
      message: "Attendance Record Delete Successful!!", 
      deletedAttendance
    });
  });
});
  

module.exports = router;