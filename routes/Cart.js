const express = require("express");
const { addToCart, getCardById, updateCart, deleteCartItem } = require("../controllers/Cart");


const router = express.Router();

router.post("/", addToCart);
router.get("/getCart", getCardById);
router.patch("/:id", updateCart);
router.delete("/:id", deleteCartItem);

module.exports = router;
