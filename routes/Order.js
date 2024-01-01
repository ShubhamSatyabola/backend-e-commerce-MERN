const express = require("express");

const { createOrder, fetchUserOrderById, fetchAllOrders, updateOrder } = require("../controllers/Order");

const router = express.Router();

router.post("/", createOrder);
router.get("/userOrders", fetchUserOrderById);
router.get('/admin',fetchAllOrders)
router.patch("/admin/:orderId", updateOrder);

module.exports = router;
