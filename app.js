require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const todoRoutes = require("./routes/todoRoutes");
const cors = require("cors");
const auth = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoutes");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/todos/public", userRoutes);
app.use("/api/todos", auth, todoRoutes);
PORT = 3000 || process.env.PORT

sequelize.sync()
    .then(() => {
        console.log("Database connected & synced");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });