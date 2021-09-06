const express = require("express");
const Staffs = require("../models/staffs");
const router = express.Router();

router.post("/staffs/save", (req, res) => {
  let newstaff = new Staffs(req.body);
  newstaff.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Staffs saved succesfully",
    });
  });
});
//get post
router.get("/staffs", (req, res) => {
  
  Staffs.find().exec((err, Staffs) => {
    var count = Staffs.length;
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        existingStaffs: Staffs,
        staffCount:count,
        
     })     
    });
});


//get specific
router.get("/staffs/:id", (req, res) => {
  let postid = req.params.id;
  Staffs.findById(postid, (err, staff) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      staff,
    });
  });
});
//update Staffs
router.put("/staffs/update/:id", (req, res) => {
  Staffs.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, staff) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Uploaded Succesfully",
      });
    }
  );
});
//delete post
router.delete("/staffs/delete/:id", (req, res) => {
  Staffs.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccess",
        err,
      });
    return res.json({
      message: "Delete Success",
      deletedPost,
    });
  });
});
module.exports = router;