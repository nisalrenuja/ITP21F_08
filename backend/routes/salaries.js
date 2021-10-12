const express = require("express");
const Salaries = require("../models/salaries");
const router = express.Router();
//save
router.post("/salary/save", (req, res) => {
  let newSalary = new Salaries(req.body);

  newSalary.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Calculated Monthly Salary Succesfully",
    });
  });
});
//get all
router.get("/salaries", (req, res) => {
  Salaries.find().sort({ "payslipID": -1 }).exec((err, salaries) => {
    var scount = salaries.length;
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      existingSalaries: salaries,
      salaryCount: scount,
    });
  });
});

//get specific
router.get("/salary/:id", (req, res) => {
  let salaryId = req.params.id;

  Salaries.findById(salaryId, (err, salary) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      salary,
    });
  });
});


//get pays/ip no check existing payslip no
router.get("/salaries/checkPayslipID", (req, res) => {
  Salaries.find().sort({payslipID:-1}).limit(1).exec((err, payslipID) => {
    return res.status(200).json({
      success: true,
      payslipID: payslipID,
    });
  });
});


//update 
router.put("/salary/update/:id", (req, res) => {
  Salaries.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, salary) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Monthly Salary Recalculated Succesfully",
      });
    }
  );
});
//delete specific
router.delete("/salary/delete/:id", (req, res) => {
  Salaries.findByIdAndRemove(req.params.id).exec((err, deletedSalary) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccessful!!",
        err,
      });
    return res.json({
      message: "Monthly Salary Deleted Successfully",
      deletedSalary,
    });
  });
});
module.exports = router;
