const Product = require('../models/product')

//add products
exports.addProducts = async (req, res) => {
    const { name, price, stock } = req.body

    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const addProduct = new Product({
            name,
            price,
            image: filePath,
            stock
        })

        await addProduct.save()
        res.status(201).json({ message: 'Product added successfully', data: addProduct })

    } catch (error) {
        console.log("🚀 ~ exports.addProducts= ~ error:", error)
        res.status(500).json({ message: "Failed to add product", error: error.message });
    }
}

//list all products
exports.getAllProducts = async (req, res) => {
    
    try {
        const getAllProducts = await Product.find();
        res.status(200).json({ message: "All Products", data: getAllProducts });
    } catch (error) {
        console.log("🚀 ~ exports.getProducts= ~ error:", error)
        res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
};

//get a product(detail)
exports.getProduct = async (req, res) => {

    const productId = req.params.productId
    try {
        const getProduct = await Product.findById(productId);
        if (!getProduct) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "All Products", data: getProduct });
    } catch (error) {
        console.log("🚀 ~ exports.getProducts= ~ error:", error)
        res.status(500).json({ message: "Failed to fetch product", error: error.message });
    }
};

//update product
exports.updateProduct = async (req, res) => {
    const productId = req.params.productId;

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, price, stock } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const updateData = {};
    if (name) updateData.name = name;
    if (price) updateData.price = price;
    if (stock) updateData.stock = stock;

    filePath ? updateData.image = filePath : null;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updateData },
            { new: true }
        );

        await product.save();
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
    } catch (error) {
        console.log("🚀 ~ exports.updateProduct= ~ error:", error);
        res.status(500).json({ message: "Failed to update product", error: error.message });
    }
};

//delete product
exports.deleteProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
    } catch (error) {
        console.log("🚀 ~ exports.deleteProduct= ~ error:", error);
        res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
};
