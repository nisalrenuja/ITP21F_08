const express = require("express");
const employees = require("../models/employees");
const assignment_assignedtostaff = require("../models/assignment_assignedtostaff");
const Posts = require("../models/Reviews");

const router = express.Router();

router.post("/employees/save", (req, res) => {
  let newemployees = new employees(req.body);
  newemployees.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "employees saved succesfully",
    });
  });
});
//get post
router.get("/employees", (req, res) => {
  
  employees.find().sort({ "empno": -1 }).exec((err, employees) => {
    var count = employees.length;
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        existingemployees: employees,
        employeeCount:count,
        
     })     
    });
});

router.get("/employeepoints", (req, res) => {
  let empno = req.params.name;
  employees.find().sort({ "empno": -1 }).exec((err, employees) => { 
    assignment_assignedtostaff.find()
      .exec((err, check) => {
      var l2 = check.length;
      var l = employees.length;
      return res.status(200).json({
        success: true,
        check: check,
        employees: employees,
        l: l,
        l2:l2,
      });
    });
  });
});


router.get("/checkassigned/:id", (req, res) => {
  let empno = req.params.id;
  assignment_assignedtostaff
    .find({ $and: [{ emp_no: empno }, { progress: { $ne: "Completed" } }] })
    .exec((err, check) => {
        return res.status(200).json({
        success: true,
        check: check,
      });
    });
});

router.get("/pendingassignments", (req, res) => {
  assignment_assignedtostaff.find({ progress : "Assigned" } ).exec((err, posts2) =>{ 
    var o = posts2.length;
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Pending: posts2,
      o:o,
    });
  });
});

router.get("/assignments/empreportupload", (req, res) => {
  assignment_assignedtostaff
    .find( { progress: { $ne: "Completed" } } )
    .exec((err, assignmentsassigned) => {
      return res.status(200).json({
        success: true,
        assignmentsassigned: assignmentsassigned,
      });
    });
});

router.get("/review/pe", (req, res) => {
  Posts.aggregate([{
    $lookup: {
      from: "assignment_assignedtostaffs",
      localField: "report",
      foreignField: "assignment_name",
      as: "work",
    },
  },{ $match:{ $or: [   { status: "Pending" } , { status: "Rejected"}  ]} }]).exec((err, posts1) => { Posts.find({ status : "Accepted" }).exec((err, posts2) =>{ var l = posts2.length;
    var o = posts1.length;
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      Pending: posts1,
      Completed: posts2,
      l:l,
      o:o,
    });
  });
});
});




//get specific
router.get("/employees/:id", (req, res) => {
  let postid = req.params.id;
  employees.findById(postid, (err, employee) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      employee,
    });
  });
});
//update employees
router.put("/employees/update/:id", (req, res) => {
  employees.findByIdAndUpdate(
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
router.delete("/employees/delete/:id", (req, res) => {
  employees.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
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