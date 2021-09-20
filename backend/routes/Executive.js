const express = require("express");
const executive = require("../models/executives");
const router = express.Router();

router.post("/executive/save", (req, res) => {
  let newexecutive = new executive(req.body);
  newexecutive.save((err) => {
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
router.get("/executive", (req, res) => {
  executive
    .find()
    .sort({ exeno: -1 })
    .exec((err, executive) => {
      var count = executive.length;
      if (err) {
        return res.status(400).json({ success: false, err });
      }
      return res.status(200).json({
        success: true,
        existingexecutive: executive,
        execoCount: count,
      });
    });
});

//get specific
router.get("/executive/:id", (req, res) => {
  let executiveid = req.params.id;
  executive.findById(executiveid, (err, executive) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      executive,
    });
  });
});
//update executives
router.put("/executive/update/:id", (req, res) => {
  executive.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, executive) => {
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
router.delete("/executive/delete/:id", (req, res) => {
  executive.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
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
