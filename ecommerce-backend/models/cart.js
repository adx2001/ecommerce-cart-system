const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId },
            name: String,
            price: Number,
            image: String,
            quantity: { type: Number, default: 1 },
        },
    ],
});

module.exports = mongoose.model("Cart", cartSchema);
