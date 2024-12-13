const express = require('express')
const router = express.Router()
const { addToCart, removeFromCart, updateCartItem, viewCart } = require('../controllers/cartController')


// route to add a product to the cart (add or update quantity)
router.post("/add", addToCart);

// route to remove a product from the cart
router.delete("/remove", removeFromCart);

// route to update product quantity in the cart
router.patch("/update", updateCartItem);

// route to view the cart
router.get("/view/:userId", viewCart);

module.exports = router;