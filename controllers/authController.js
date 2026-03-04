const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshModel");

// Generate Access Token
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// Generate Refresh Token
const generateRefreshToken = async (user) => {
    const refreshToken = jwt.sign(
        { id: user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    await RefreshToken.create({
        token: refreshToken,
        UserId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return refreshToken;
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};