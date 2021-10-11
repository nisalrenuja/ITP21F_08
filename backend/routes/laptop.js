const express = require('express');
const Laptop = require('../models/laptop');

const router = express.Router();

//save laptop detail route

router.post("/laptop/save", (req, res) => {
  let newLaptop = new Laptop(req.body);

  newLaptop.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Inventory Laptops Details saved successfully",
    });
  });
});

//get laptop details

router.get("/laptops", (req, res) => {
    Laptop.find().exec((err, laptops) => {
      var lapcount = laptops.length;
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingLaptops: laptops,
      laptopCount: lapcount,
    });
  });
});

//get a specific post
router.get("/laptop/:id", (req, res) => {
  let id = req.params.id;

  Laptop.findById(id, (err, laptop) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      laptop,
    });
  });
});

//update posts
router.put("/laptop/update/:id", (req, res) => {
  Laptop.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, laptop) => {
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
router.delete("/laptop/delete/:id", (req, res) => {
  Laptop.findByIdAndRemove(req.params.id).exec((err, deletedLaptop) => {
    if (err)
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    return res.json({
      message: "Delete Successful",
      deletedLaptop,
    });
  });
});

module.exports = router;
