//write http requests
const express = require("express");
const Payrolls = require("../models/payrolls");

const router = express.Router();

//save payrolls (POST)
router.post("/payroll/save", (req, res) => {
    let newPayroll = new Payrolls(req.body);
  
    newPayroll.save((err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json({
        success: "Payroll details added successfully!!",
      });
    });
  });


//get leaves deatails table(GET)
router.get("/payrolls", (req, res) => {
  Payrolls.find().sort({ "empno": -1 }).exec((err, payrolls) => {
    var pcount = payrolls.length;
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingPayrolls: payrolls,
      payrollCount:pcount
    });
  });
});

//get a specific leave details (GET)
router.get("/payroll/:id", (req, res) =>{
  let payrollId = req.params.id;

  Payrolls.findById(payrollId, (err, payroll) =>{
    if(err){
      return res.status(400).json({
        success: false,
        err,
      });
    } 
    return res.status(200).json({
      success: true,
      payroll
    }); 
  });
});

//To get the max employee number in the table, for automatic employee number generation
router.get("/payrolls/checkEmpNo", (req, res) => {
  Payrolls.find().sort({empno:-1}).limit(1).exec((err, empno) => {
    return res.status(200).json({
      success: true,
      empno: empno,
    });
  });
});


//check if acc no. already exists in the system for validation
router.get("/payroll/checkAccountNo/:no", (req, res) => {
  let account_no = req.params.no;
  Payrolls.find({ account_no: account_no}).exec((err, staffs) => {
    return res.status(200).json({
      success: true,
      staffs: staffs,
    });
  });
});





//update (PUT)
router.put("/payroll/update/:id", (req, res) => {
  Payrolls.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, payroll) => {
      if (err) {
        return res.status(400).json({error: err});
      }
      return res.status(200).json({
        success: "Paryroll details Successfully Updated!!",
      });
    }
  );
});


  
//delete post
//since we are deleting a specific post ... need to have an id
router.delete("/payroll/delete/:id", (req, res) => {
  Payrolls.findByIdAndRemove(req.params.id).exec((err, deletedPayroll) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccessful!!", err
      });
    return res.json({
      message: "Payroll Details Delete Successful!!", deletedPayroll
    });
  });
});
module.exports = router;