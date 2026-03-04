const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshModel");
const User = require("../models/userModel");
const { generateAccessToken, generateRefreshToken } = require("../controllers/authController");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields required" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User created", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({ message: "Invalid credentials" });
        const accessToken = generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);
        res.json({
            accessToken,
            refreshToken,
            user,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(401).json({ message: "No token provided" });
        const storedToken = await RefreshToken.findOne({ where: { token } });
        if (!storedToken)
            return res.status(403).json({ message: "Invalid refresh token" });
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Expired token" });

            const newAccessToken = jwt.sign(
                { id: user.id },
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
            );
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const logout = async (req, res) => {
    try {
        const { token } = req.body;
        await RefreshToken.destroy({ where: { token } });
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    signup,
    login,
    refreshToken,
    logout,
}