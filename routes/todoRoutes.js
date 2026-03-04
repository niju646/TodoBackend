const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.post("/create", todoController.createTodo);
router.get("/getAll", todoController.getAllTodos);
router.get("/getById/:id", todoController.getTodoById);
router.put("/update/:id", todoController.updateTodo);
router.delete("/delete/:id", todoController.deleteTodo);
router.put("/updateStatus/:id", todoController.updateStatus);
router.get("/totalTodos", todoController.totalTodos);
router.get("/totalCompletedTodos", todoController.totalCompletedTodos);
router.get("/pendingCount", todoController.pendingCount);

module.exports = router;