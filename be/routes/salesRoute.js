const express = require("express");
const router = express.Router();

// import controller
const SalesController = require("../controllers/SalesController");

router.get("/all-sales", SalesController.getAll);
router.post("/add", SalesController.add);
router.put("/update/:id", SalesController.update);
router.delete("/delete/:id", SalesController.delete);

module.exports = router;
