"use strict";

var express = require("express");
var router = express.Router();
var data = [];

router.get("/", function (req, res) {
  console.log("[GET] /car:", data);
  res.json(data);
});

router.post("/", function (req, res) {
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color,
  });
  res.json({ message: "success" });
});

router.delete("/", function (req, res) {
  data = data.filter(function (car) {
    if (car.plate !== req.body.plate) console.log("[DEL] /car:", car);
    return car.plate !== req.body.plate;
  });
  res.json({ message: "success" });
});

module.exports = router;
