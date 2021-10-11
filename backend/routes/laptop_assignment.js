const express = require("express");
//import models
const laptop_assignment = require("../models/laptop_assignment");
const assignment_assignedtostaff = require("../models/assignment_assignedtostaff");
const laptop = require("../models/laptop");
const router = express.Router();

//insert allocations
router.post("/lapassignments/save/", (req, res) => {
  let newPost = new laptop_assignment(req.body);
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
//get laptops
router.get("/laps/ass", (req, res) => {
  laptop
    .find({
      $and: [
        { status: { $ne: "Repairing" } },
        { status: { $ne: "Discarded" } },
      ],
    })
    .exec((err, laps) => {
      return res.status(200).json({
        success: true,
        laps: laps,
      });
    });
});
//check laptop status function
router.get("/laps/check/:id", (req, res) => {
  let lapid = req.params.id;
  laptop.find({ id: lapid }).exec((err, laps) => {
    return res.status(200).json({
      success: true,
      laps: laps,
    });
  });
});
//check laptop status function
router.get("/checklapassigned/:id", (req, res) => {
  let lapid = req.params.id;
  laptop_assignment
    .find({ $and: [{ lapid: lapid }, { status: { $ne: "Completed" } }] })
    .exec((err, check) => {
      var l = check.length;
      return res.status(200).json({
        success: true,
        check: check,
        l: l,
      });
    });
});
//check assignment name function
router.get("/checkassignmentlap/:id", (req, res) => {
  let assid = req.params.id;
  assignment_assignedtostaff
    .find({ assignment_name: assid })
    .exec((err, check) => {
      var l = check.length;
      return res.status(200).json({
        success: true,
        check: check,
        l: l,
      });
    });
});
//check laptop assignment
router.get("/lapsassigned/", (req, res) => {
  laptop_assignment
    .find({ status: { $ne: "Completed" } })
    .exec((err, check) => {
      var l = check.length;
      return res.status(200).json({
        success: true,
        check: check,
        l: l,
      });
    });
});
//functions for charts
router.get("/lapscomp/", (req, res) => {
  laptop_assignment.find({ status: "Completed" }).exec((err, check) => {
    var l = check.length;
    return res.status(200).json({
      success: true,
      check: check,
      l: l,
    });
  });
});

router.get("/lapassignments/dis", (req, res) => {
  laptop_assignment
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
    .exec((err, lapassignments) => {
      var count = lapassignments.length;

      return res.status(200).json({
        success: true,
        lapassignments: lapassignments,
        count: count,
      });
    });
});

//get specific lap allocation
router.get("/lapassignment/:id", (req, res) => {
  let assid = req.params.id;
  laptop_assignment
    .find({ assignment_name: assid })
    .limit(1)
    .sort({ $natural: -1 })
    .exec((err, lapass) => {
      return res.status(200).json({
        success: true,
        lapass: lapass,
      });
    });
});

//update laptop allocation
router.put("/lapassignments/update/:name", (req, res) => {
  let name = req.params.name;
  laptop_assignment
    .update(
      { assignment_name: name },
      {
        date_received: req.body.date_received,
        status: req.body.status,
      }
    )
    .exec((err, Post1) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Uploaded Succesfully",
      });
    });
});
/*
//update posts
router.put("/assignments/updateallo/:name", (req, res) => {
  let name = req.params.name;
  let empno = req.body.empno;
  assignment_assignedtostaff
    .update(
      { $and: [{ emp_no: empno }, { assignment_name: name }] },
      {
        travel_allowance: req.body.travel_allowance,
      }
    )
    .exec((err, post) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Uploaded Succesfully",
      });
    });
}); */
//delete allocation
router.delete("/lapassignments/delete/:name", (req, res) => {
  let postid = req.params.name;
  laptop_assignment
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
