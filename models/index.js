const User = require("./userModel");
const Todo = require("./todo");
const Category = require("./categories");


// One User has many Todos
User.hasMany(Todo, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    as: "todos"
});

// Todo belongs to User
Todo.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

// User → Category
User.hasMany(Category, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    as: "categories"
});

Category.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

// Category → Todo
Category.hasMany(Todo, {
    foreignKey: "category_id",
    onDelete: "CASCADE",
    as: "todos"
});

Todo.belongsTo(Category, {
    foreignKey: "category_id",
    as: "category"
});

module.exports = {
    User,
    Todo,
    Category,
};