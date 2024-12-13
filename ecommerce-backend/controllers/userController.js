const User = require('../models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register a user
exports.registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {

        //check if the user already exists with the provided email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to register user", error: error.message });
    }
};

// login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "8h",
        });

        // send the token as an HttpOnly cookie
        res.cookie("token", token, {
            httpOnly: true,
        });
        let data = {
            _id: user._id, name: user.name, email: user.email, role: user.role
        }
        res.status(200).json({ message: "Login Successful", data: data });
    } catch (error) {
        res.status(500).json({ message: "Failed to login", error });
    }
};
