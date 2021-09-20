const express = require("express");
const employees = require("../models/employees");
const assignment_assignedtostaff = require("../models/assignment_assignedtostaff");
const Posts = require("../models/Reviews");
const Points = require("../models/points");

const router = express.Router();

//save employee details
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

router.post("/points/save", (req, res) => {
 let newpoints = req.body;
  Points.create(newpoints, (err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "points saved succesfully",
    });
  });
});

//get employees, assignments, reviews
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
router.get("/employees/audit", (req, res) => {  
  employees.find({type : { $eq: "Audit" }}).sort({ "empno": -1 }).exec((err, employees) => { 
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

router.get("/employees/tax", (req, res) => {  
  employees.find({type : { $eq: "Tax" }}).sort({ "empno": -1 }).exec((err, employees) => { 
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

router.get("/employees/counts", (req, res) => {  
  employees.find({type : { $eq: "Audit" }}).count().exec((err, audit) => { employees.find({type : { $eq: "Tax" }}).count().exec((err, tax) => { 
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        auditcount: audit,
        taxcount: tax,
     })     
    });
    });
});

router.get("/employees/division", (req, res) => {  
  employees.find({status : { $eq: "Senior" }}).count().exec((err, senior) => { employees.find({status : { $eq: "Trainee" }}).count().exec((err, trainee) => { 
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        seniorcount: senior,
        traineecount: trainee,
     })     
    });
  });
});

router.get("/employees/senior", (req, res) => {  
  employees.find( {
    $and: [
       { status: { $eq: "Senior" } },
       { gender: { $eq: "M" } }
    ]
 } ).count().exec((err, seniorM) => { employees.find( {
  $and: [
     { status: { $eq: "Senior" } },
     { gender: { $eq: "F" } }
  ]
} ).count().exec((err, seniorF) => { 
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        seniorM: seniorM,
        seniorF: seniorF
     })     
    });
  });
});

router.get("/employees/trainee", (req, res) => {  
  employees.find( {
    $and: [
       { status: { $eq: "Trainee" } },
       { gender: { $eq: "M" } }
    ]
 } ).count().exec((err, traineeM) => { employees.find( {
  $and: [
     { status: { $eq: "Trainee" } },
     { gender: { $eq: "F" } }
  ]
} ).count().exec((err, traineeF) => { 
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        traineeM: traineeM,
        traineeF: traineeF
     })     
    });
  });
});

router.get("/employees/tax", (req, res) => {  
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

router.get("/employees/province", (req, res) => {  
  employees.aggregate([
    { "$facet": {
       "W": [
      { "$match": { "province": "Western" }},
      { "$count": "W" }
      ],
      "C": [
      { "$match": { "province": "Central" }},
      { "$count": "C" }
      ],
      "S": [
      { "$match": { "province": "Southern" }},
      { "$count": "S" }
      ],
      "U": [
      { "$match": { "province": "Uva" }},
      { "$count": "U" }
      ],
      "Sa": [
      { "$match": { "province": "Sabaragamuwa" }},
      { "$count": "Sa" }
      ],
      "NW": [
      { "$match": { "province": "North Western" }},
      { "$count": "NW" }
      ],
      "NC": [
      { "$match": { "province": "North Central" }},
      { "$count": "NC" }
      ],
      "N": [
      { "$match": { "province": "Northern" }},
      { "$count": "N" }
      ],
      "E": [
      { "$match": { "province": "Eastern" }},
      { "$count": "E" }
      ]
    }},
      { "$project": {
      "W": { "$arrayElemAt": ["$W.W", 0] },
      "C": { "$arrayElemAt": ["$C.C", 0] },
      "S": { "$arrayElemAt": ["$S.S", 0] },
      "U": { "$arrayElemAt": ["$U.U", 0] },
      "Sa": { "$arrayElemAt": ["$Sa.Sa", 0] },
      "NW": { "$arrayElemAt": ["$NW.NW", 0] },
      "NC": { "$arrayElemAt": ["$NC.NC", 0] },
      "N": { "$arrayElemAt": ["$N.N", 0] },
      "E": { "$arrayElemAt": ["$E.E", 0] }
    }}
    ]).exec((err, province) => { 
    if (err) {
      return res.status(400).json({ success: false, err });
    }
      return res.status(200).json({
        success: true,
        province: province,
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

router.get("/employeepoints2", (req, res) => {
  let empno = req.params.name;
  employees.aggregate([
    { $sort : {points:1}},
    {
      "$lookup": {
        "from": "assignment_assignedtostaffs",
        "localField": "empno",
        "foreignField": "emp_no",
        "as": "assignments"
      }
    },
    {
      "$lookup": {
        "from": "reviews",
        "localField": "assignments.assignment_name",
        "foreignField": "report",
        "as": "reports"
      }
    },
    {
      $project: {
        points: {
          $sum: {
            $map: {
              input: "$reports",
              in: "$$this.points"
            }
          }
        },
        empno: 1,
        date_saved: new Date(),       
      }
    }
  ]).exec((err, points) => { 
    
      var l3 = points.length;
      return res.status(200).json({
        success: true,
        points: points,
        l3: l3,
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

router.get("/checkcompleted/:id", (req, res) => {
  let empno = req.params.id;
  assignment_assignedtostaff
    .find({ $and: [{ emp_no: empno }, { progress: { $eq: "Completed" } }] })
    .exec((err, check) => {
        return res.status(200).json({
        success: true,
        check: check,
      });
    });
});

router.get("/pendingassignments", (req, res) => {
  assignment_assignedtostaff.aggregate([
    {$match:{progress:"Assigned"}},
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
  ]).exec((err, assignmentsassigned) => {
      var count = assignmentsassigned.length;

      return res.status(200).json({
        success: true,
        assignmentsassigned: assignmentsassigned,
        count: count,
      });
    });
})



router.get("/assignments/empreportupload", (req, res) => {
  assignment_assignedtostaff
  .distinct("emp_no", { progress: { $ne: "Completed" } })
    .exec((err, assignmentsassigned) => {assignment_assignedtostaff
      .distinct("assignment_name", { progress: { $ne: "Completed" } })
      .exec((err, assignments) => {
      return res.status(200).json({
        success: true,
        empnumbers: assignmentsassigned,
        assignmentnames: assignments,
      });
    });
  });
});

router.get("/review/pe", (req, res) => {
  Posts.aggregate([{ $match:{ $or: [   { status: "Pending" } , { status: "Rejected"}]}},{
    $lookup: {
      from: "assignment_assignedtostaffs",
      localField: "report",
      foreignField: "assignment_name",
      as: "work",
    }},{$unwind:'$work'},
    {$project:{
         deadline:'$work.deadline',
         report: 1, 
         reportPDF: 1,
         sub_date: 1,
         points: 1,
         feedback: 1,
         status: 1
    }},{
      $group: {
        _id: "$report",
        doc: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: {
        newRoot: "$doc",
      },
    }
 ]).exec((err, posts1) => { Posts.find({ partnerStatus : "Accepted" }).exec((err, posts2) =>{ var l = posts2.length;
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
router.get("/employees/alocation/:id1", (req, res) => {
  let postid = req.params.id1;
  assignment_assignedtostaff.find({emp_no :postid}).count().exec((err, allocationcount) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      allocationcount,
    });
  });
});
router.get("/employees/pointsreq/:id2", (req, res) => {
  let postid2 = parseInt(req.params.id2);
  Points.aggregate([
    {
      "$match": {
        "empno": {
          "$eq": postid2
        }
      }
    },
    {
      "$group": {
        "_id": null,
        "maxpoints": {
          "$max": "$points"
        }
      }
    },
    {
      "$project": {
        "_id": 0,
        "maxpoints": 1
      }
    }
  ]).exec((err, maxpoints) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      maxpoints,
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

router.put("/assignments/updte/:name", (req, res) => {
  let name = req.params.name;
  assignment_assignedtostaff
    .updateMany(
      { assignment_name: name },
      {
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