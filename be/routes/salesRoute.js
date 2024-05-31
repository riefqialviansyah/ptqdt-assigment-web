const express = require("express");
const router = express.Router();

// import controller
const SalesController = require("../controllers/SalesController");

router.get("/getAll", SalesController.getAll);
router.get("/getOne/:id", SalesController.getOne);
router.get("/lowAndHighData", SalesController.lowestAndHighest);
router.post("/add", SalesController.add);
router.put("/update/:id", SalesController.update);
router.delete("/delete/:id", SalesController.delete);

module.exports = router;
