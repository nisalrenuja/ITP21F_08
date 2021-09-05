const express = require("express");
const assignment_assignedtostaff = require("../models/assignment_assignedtostaff");
const router = express.Router();

router.post("/assignments/save/", (req, res) => {
  let newPost = new assignment_assignedtostaff(req.body);
  newPost.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Posts saved succesfully",
    });
  });
});
//get post
router.get("/staff/ass", (req, res) => {
  staff_ass.find().exec((err, staff) => {
    return res.status(200).json({
      success: true,
      staff: staff,
    });
  });
});

router.get("/assignments/dis", (req, res) => {
  assignment_assignedtostaff
    .aggregate([
      {
        $group: {
          _id: "$assignment_name",
          doc: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$doc",
        },
      },
    ])
    .exec((err, assignmentsassigned) => {
      var count = assignmentsassigned.length;

      return res.status(200).json({
        success: true,
        assignmentsassigned: assignmentsassigned,
        count: count,
      });
    });
});

//get specific
router.get("/assignments/:id", (req, res) => {
  let assid = req.params.id;
  assignment_assignedtostaff.findById(assid, (err, assignmentsassigned) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      assignmentsassigned,
    });
  });
});
//update posts
router.put("/assignments/update/:id", (req, res) => {
  assignment_assignedtostaff.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, post) => {
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
router.delete("/assignments/delete/:name", (req, res) => {
  let postid = req.params.name;
  assignment_assignedtostaff
    .remove({ assignment_name: postid })
    .exec((err, deletedPost) => {
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
