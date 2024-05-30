const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API!",
    createBy: "Riefqi Alviansyah",
    github: "https://github.com/riefqialviansyah",
  });
});

router.use("/sales", require("./salesRoute"));

module.exports = router;
