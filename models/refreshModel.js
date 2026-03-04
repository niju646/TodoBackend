const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./userModel");

const RefreshToken = sequelize.define("RefreshToken", {
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
    },
});

User.hasMany(RefreshToken);
RefreshToken.belongsTo(User);

module.exports = RefreshToken;