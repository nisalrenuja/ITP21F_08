const express = require("express");
const executives = require("../models/executives");
const router = express.Router();

router.post("/executives/save", (req, res) => {
  let newexecutives = new executives(req.body);
  newexecutives.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "executives saved succesfully",
    });
  });
});
//get post
router.get("/executives", (req, res) => {
  executives.find().exec((err, executives) => {
    var count = executives.length;
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      existingexecutives: executives,
      employeeCount: count,
    });
  });
});

//get specific
router.get("/executives/:id", (req, res) => {
  let postid = req.params.id;
  executives.findById(postid, (err, employee) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      executives,
    });
  });
});
//update executives
router.put("/executives/update/:id", (req, res) => {
  executives.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, employee) => {
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
router.delete("/executives/delete/:id", (req, res) => {
  executives.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
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
