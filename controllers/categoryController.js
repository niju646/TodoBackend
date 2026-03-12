const Category = require("../models/categories");
//create category
const createCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const user_id = req.user.id;
        const existingCategory = await Category.findOne({
            where: {
                user_id: user_id,
                name: category
            }
        })
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }
        const newCategory = await Category.create({
            name: category,
            user_id: user_id
        })
        res.status(201).json({
            message: "Category created successfully",
            data: newCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

//get all categories
const getAllCategories = async (req, res) => {
    try {
        const user_id = req.user.id;
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;
        const whereCondition = {
            user_id: user_id
        };
        const { count, rows } = await Category.findAndCountAll({
            where: whereCondition,
            limit: limit,
            offset: offset,
            order: [["createdAt", "DESC"]],
        });
        res.json({
            message: "categories fetched successfully",
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            data: rows,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

//update category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;
        const user_id = req.user.id;

        const existingCategory = await Category.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        });

        if (!existingCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        await existingCategory.update({
            name: category
        });

        res.status(200).json({
            message: "Category updated successfully",
            data: existingCategory
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//delete category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.id;

        const existingCategory = await Category.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        });

        if (!existingCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        await existingCategory.destroy();

        res.status(200).json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
}