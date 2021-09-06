const express = require('express');
const LaptopRepair = require('../models/laptop_repair');

const router = express.Router();

//save laptop repair details routes

router.post("/laptop_repair/save", (req, res) => {
  let newLaptopRepair = new LaptopRepair(req.body);

  newLaptopRepair.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Inventory Laptops Repair Details saved successfully",
    });
  });
});

//get laptop repair details

router.get("/laptops_repair", (req, res) => {
    LaptopRepair.find().exec((err, laptopsRepair) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingLaptopsRepair: laptopsRepair,
    });
  });
});

//get a specific post
router.get("/laptop_repair/:id", (req, res) => {
  let id = req.params.id;

  LaptopRepair.findById(id, (err, laptopRepair) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      laptopRepair,
    });
  });
});

//update repair details posts
router.put("/laptop_repair/update/:id", (req, res) => {
  LaptopRepair.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, laptopRepair) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      return res.status(200).json({
        success: "Updated Successfully",
      });
    }
  );
});

//delete post
router.delete("/laptop_repair/delete/:id", (req, res) => {
  LaptopRepair.findByIdAndRemove(req.params.id).exec((err, deletedLaptopRepair) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete Successful",
      deletedLaptopRepair,
    });
  });
});

module.exports = router;
