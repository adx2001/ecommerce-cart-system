const express = require("express");
const router = express.Router();
const {processPayment,getOrders,} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");


router.post("/process/payment", protect, processPayment);
router.get("/orders", protect, getOrders);

module.exports = router;
