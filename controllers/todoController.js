const Todo = require("../models/todo");

// CREATE
const createTodo = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { title, description, deadline } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingTodo = await Todo.findOne({
            where: {
                user_id: user_id,
                title: title,
                description: description,
            },
        });
        if (existingTodo) {
            return res.status(400).json({ error: "Todo already exists" });
        }
        const todo = await Todo.create({ title, description, user_id: user_id, deadline: deadline });
        res.status(201).json({
            message: "Todo created successfully",
            data: todo,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL
const getAllTodos = async (req, res) => {
    try {
        const user_id = req.user.id;
        let { page = 1, limit = 10, status } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;
        const whereCondition = {
            user_id: user_id
        };
        if (status) {
            whereCondition.status = status;
        }
        const { count, rows } = await Todo.findAndCountAll({
            where: whereCondition,
            limit: limit,
            offset: offset,
            order: [["createdAt", "DESC"]],
        });
        res.json({
            message: "Todos fetched successfully",
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ONE
const getTodoById = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user.id;
        const todo = await Todo.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        })
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE
const updateTodo = async (req, res) => {
    try {
        const { title, description, status, deadline } = req.body;
        const user_id = req.user.id;
        const todo = await Todo.findOne({
            where: {
                id: req.params.id,
                user_id: user_id
            }
        })
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        await todo.update({ title, description, status, deadline });
        res.json({
            message: "Todo updated successfully",
            data: todo,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//update status 
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const user_id = req.user.id;
        const todo = await Todo.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        })
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        await todo.update({ status });
        res.json({
            message: "Todo updated successfully",
            data: todo,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// DELETE
const deleteTodo = async (req, res) => {
    try {
        const user_id = req.user.id;
        const todo = await Todo.findByPk(req.params.id, {
            where: {
                user_id: user_id
            }
        });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        await todo.destroy();
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//total todos count for each user
const totalTodos = async (req, res) => {
    try {
        const user_id = req.user.id;
        const todos = await Todo.count({
            where: {
                user_id: user_id,
                status: false
            }
        })
        res.json({
            message: "Todos fetched successfully",
            data: todos,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//total completed todos count for each user
const totalCompletedTodos = async (req, res) => {
    try {
        const user_id = req.user.id;
        const todos = await Todo.count({
            where: {
                user_id: user_id,
                status: true
            }
        })
        res.json({
            message: "Todos fetched successfully",
            data: todos,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//pending count
const pendingCount = async (req, res) => {
    try {
        const user_id = req.user.id;
        const todos = await Todo.count({
            where: {
                user_id: user_id,
                status: false
            }
        })
        res.json({
            message: "Todos fetched successfully",
            data: todos,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    updateStatus,
    totalTodos,
    totalCompletedTodos,
    pendingCount,
};