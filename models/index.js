const User = require("./userModel");
const Todo = require("./todo");

// One User has many Todos
User.hasMany(Todo, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

// Todo belongs to User
Todo.belongsTo(User, {
    foreignKey: "userId",
});

module.exports = {
    User,
    Todo,
};