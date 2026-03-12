const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const categoryController = require("../controllers/categoryController");

router.post("/create", todoController.createTodo);
router.get("/getAll/:category_id", todoController.getAllTodos);
router.get("/getById/:id", todoController.getTodoById);
router.put("/update/:id", todoController.updateTodo);
router.delete("/delete/:id", todoController.deleteTodo);
router.put("/updateStatus/:id", todoController.updateStatus);
router.get("/totalTodos", todoController.totalTodos);
router.get("/totalCompletedTodos", todoController.totalCompletedTodos);
router.get("/pendingCount", todoController.pendingCount);

//create category
router.post("/createCategory", categoryController.createCategory);
router.get("/getAllCategories", categoryController.getAllCategories);
router.put("/updateCategory/:id", categoryController.updateCategory);
router.delete("/deleteCategory/:id", categoryController.deleteCategory);

module.exports = router;