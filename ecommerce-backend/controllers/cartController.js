const Cart = require('../models/cart')

// add product to the cart (add or update quantity)
exports.addToCart = async (req, res) => {
    const { productId, userId, productName, productImg, productPrice } = req.body;

    try {

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = await Cart.create({
                userId,
                products: [{ productId, quantity: 1, name: productName, price: productPrice, image: productImg }],
            });
        } else {
            // check if product already exists in the cart
            const existingProduct = cart.products.find((p) =>
                p.productId.toString() === productId
            );

            if (existingProduct) {
                // if the product already exists, increase its quantity
                existingProduct.quantity += 1;
            } else {
                // if it's not in the cart, add it
                cart.products.push({ productId: productId, name: productName, price: productPrice, image: productImg });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.log("🚀 ~ exports.addToCart= ~ error:", error)
        res.status(500).json({ message: "Failed to add product to cart", error: error.message });
    }
};

// remove product from the cart
exports.removeFromCart = async (req, res) => {
    const { productId, userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId: userId });

        if (cart) {
            const productIndex = cart.products.find((p) =>
                p.productId.toString() === productId
            );

            if (productIndex) {
                // remove the product from the array
                cart.products = cart.products.filter((p) =>
                    p.productId.toString() !== productId
                );

                await cart.save();
                res.status(200).json({ message: "Product removed from cart" });
            } else {
                res.status(404).json({ message: "Product not found in cart" });
            }
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.log("🚀 ~ exports.removeFromCart= ~ error:", error)
        res.status(500).json({ message: "Failed to remove product from cart", error: error.message });
    }
};

// update product quantity in the cart
exports.updateCartItem = async (req, res) => {
    const { productId, quantity, userId } = req.body;

    try {
        const cart = await Cart.findOne({ userId: userId });

        if (cart) {
            const product = cart.products.find((p) =>
                p.productId.toString() === productId
            );

            if (product) {
                product.quantity = quantity;
                await cart.save();
                res.status(200).json({message:"Cart Updated Successfully"});
            } else {
                res.status(404).json({ message: "Product not found in cart" });
            }
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.log("🚀 ~ exports.updateCartItem= ~ error:", error)
        res.status(500).json({ message: "Failed to update product quantity", error: error.message });
    }
};

// view cart
exports.viewCart = async (req, res) => {
    const userId = req.params.userId;

    try {
        const cart = await Cart.findOne({ userId: userId });

        if (cart) {
            res.status(200).json({message:"Cart",data:cart});
        } else {
            res.status(404).json({ message: "No products in cart" });
        }
    } catch (error) {
        console.log("🚀 ~ exports.viewCart= ~ error:", error)
        res.status(500).json({ message: "Failed to retrieve cart products", error: error.message });
    }
};
