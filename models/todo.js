const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Todo = sequelize.define("Todo", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deadline: {
        type: DataTypes.DATE,
    },
    description: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = Todo;