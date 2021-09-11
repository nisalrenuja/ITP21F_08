const express = require("express");
const assignment_assignedtostaff = require("../models/assignment_assignedtostaff");
const employees = require("../models/employees");
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
  employees.find().exec((err, staff) => {
    return res.status(200).json({
      success: true,
      staff: staff,
    });
  });
});
router.get("/staff/check/:no", (req, res) => {
  let empno = req.params.no;
  employees.find({ empno: empno }).exec((err, staffs) => {
    return res.status(200).json({
      success: true,
      staffs: staffs,
    });
  });
});
router.get("/checkassigned/:name", (req, res) => {
  let empno = req.params.name;
  assignment_assignedtostaff
    .find({ $and: [{ emp_no: empno }, { progress: { $ne: "Completed" } }] })
    .exec((err, check) => {
      var l = check.length;
      return res.status(200).json({
        success: true,
        check: check,
        l: l,
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
router.get("/assignment/:id", (req, res) => {
  let assid = req.params.id;
  assignment_assignedtostaff
    .find({ assignment_name: assid })
    .limit(1)
    .sort({ $natural: -1 })
    .exec((err, ass) => {
      assignment_assignedtostaff
        .aggregate([
          { $match: { assignment_name: assid } },
          {
            $lookup: {
              from: "employees",
              localField: "emp_no",
              foreignField: "empno",
              as: "employees",
            },
          },
        ])
        .exec((err, ass2) => {
          return res.status(200).json({
            success: true,
            ass: ass,
            ass2: ass2,
          });
        });
    });
});

router.put("/assignments/update/:name", (req, res) => {
  let name = req.params.name;
  assignment_assignedtostaff
    .updateMany(
      { assignment_name: name },
      {
        deadline: req.body.deadline,
        progress: req.body.progress,
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
router.get("/assignments/count", (req, res) => {
  assignment_assignedtostaff
    .distinct("assignment_name", { progress: { $ne: "Completed" } })
    .exec((err, assignmentsassigned) => {
      var count = assignmentsassigned.length;
      assignment_assignedtostaff
        .distinct("assignment_name", { progress: "Completed" })
        .exec((err, assignmentsassigned2) => {
          var count2 = assignmentsassigned2.length;
          return res.status(200).json({
            success: true,
            assignmentsassigned: assignmentsassigned,
            count: count,
            assignmentsassigned2: assignmentsassigned2,
            count2: count2,
          });
        });
    });
});
router.get("/assignments/staffcount", (req, res) => {
  employees.find().exec((err, staff) => {
    assignment_assignedtostaff
      .distinct("emp_no", { progress: { $ne: "Completed" } })
      .exec((err, staffw) => {
        return res.status(200).json({
          success: true,
          staff: staff,

          staffw: staffw,
        });
      });
  });
});
router.get("/assignments/allowances1", (req, res) => {
  var d = new Date();
  var n = d.getMonth() + 1;
  var n2 = d.getFullYear();
  assignment_assignedtostaff
    .find({
      $expr: {
        $and: [
          {
            $eq: [
              {
                $month: "$date_of_allocation",
              },
              n,
            ],
          },
          {
            $eq: [
              {
                $year: "$date_of_allocation",
              },
              n2,
            ],
          },
        ],
      },
    })
    .exec((err, posts) => {
      if (err)
        return res.status(400).json({
          message: "Unsuccess",
          err,
        });
      return res.json({
        success: true,
        posts: posts,
      });
    });
});
router.get("/assignments/allowances2", (req, res) => {
  var d = new Date();
  var n = d.getMonth();
  var n2 = d.getFullYear();
  assignment_assignedtostaff
    .find({
      $expr: {
        $and: [
          {
            $eq: [
              {
                $month: "$date_of_allocation",
              },
              n,
            ],
          },
          {
            $eq: [
              {
                $year: "$date_of_allocation",
              },
              n2,
            ],
          },
        ],
      },
    })
    .exec((err, posts) => {
      if (err)
        return res.status(400).json({
          message: "Unsuccess",
          err,
        });
      return res.json({
        success: true,
        posts: posts,
      });
    });
});
router.get("/assignments/allowances3", (req, res) => {
  var d = new Date();
  var n = d.getMonth() - 1;
  var n2 = d.getFullYear();
  assignment_assignedtostaff
    .find({
      $expr: {
        $and: [
          {
            $eq: [
              {
                $month: "$date_of_allocation",
              },
              n,
            ],
          },
          {
            $eq: [
              {
                $year: "$date_of_allocation",
              },
              n2,
            ],
          },
        ],
      },
    })
    .exec((err, posts) => {
      if (err)
        return res.status(400).json({
          message: "Unsuccess",
          err,
        });
      return res.json({
        success: true,
        posts: posts,
      });
    });
});
router.get("/assignments/allowances4", (req, res) => {
  var d = new Date();
  var n = d.getMonth() - 2;
  var n2 = d.getFullYear();
  assignment_assignedtostaff
    .find({
      $expr: {
        $and: [
          {
            $eq: [
              {
                $month: "$date_of_allocation",
              },
              n,
            ],
          },
          {
            $eq: [
              {
                $year: "$date_of_allocation",
              },
              n2,
            ],
          },
        ],
      },
    })
    .exec((err, posts) => {
      if (err)
        return res.status(400).json({
          message: "Unsuccess",
          err,
        });
      return res.json({
        success: true,
        posts: posts,
      });
    });
});
module.exports = router;
