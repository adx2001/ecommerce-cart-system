const Cart = require("../models/cart")
const Order = require("../models/order");

// process payment (Simulate Payment)
exports.processPayment = async (req, res) => {
    const userId = req.user.id;
    console.log("🚀 ~ exports.processPayment= ~ userId:", userId)
    
    try {
        const cart = await Cart.findOne({ userId: userId });

        if (cart) {
            const totalPrice = cart.products.reduce((total, item) => total + item.price * item.quantity, 0);

            const order = await Order.create({
                userId: userId,
                products: cart.products,
                totalPrice,
                paymentStatus: "Paid",
            });

            await Cart.deleteOne({ _id: cart._id });
            res.status(200).json({ message: "Order Successful", data: order });
        } else {
            res.status(404).json({ message: "No items found in cart to process" });
        }
    } catch (error) {
        console.log("🚀 ~ exports.processPayment= ~ error:", error)
        res.status(500).json({ message: "Payment processing failed", error });
    }
};

// show order list
exports.getOrders = async (req, res) => {
    const userId = req.user.id;

    try {
        const orders = await Order.find({ userId: userId });
        res.status(200).json({ message: "Orders", data: orders });
    } catch (error) {
        res.status(500).json({ message: "Failed to get order history", error });
    }
};
