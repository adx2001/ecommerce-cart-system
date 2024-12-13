const express = require('express')
const router = express.Router()
const { addProducts, getAllProducts, getProduct, updateProduct, deleteProduct } = require('../controllers/productController')
const upload = require("../utils/fileUpload");
const { protect, admin } = require("../middlewares/authMiddleware");

// add product 
router.post("/add", upload.single("image"), addProducts);

//get all products (only logged in users can view products)
router.get('/view', protect, getAllProducts)

//get a single product
router.get('/:productId', getProduct)

//update a product
router.put("/update/:productId", upload.single("image"), updateProduct);

//delete a product
router.delete('/:productId', deleteProduct)

module.exports = router