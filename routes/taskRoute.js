import express from "express";
import Task from "../models/Task.js";
import Validatetasktitle from "../middleware/validatetaktitle.js";

const router = express.Router();

// GET: Read all tasks
router.get("/task", async (req, res) => {
    try {
        const tasks = await Task.find();

        res.status(200).json({
            count: tasks.length,
            tasks
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
});

// GET: Read one task by MongoDB ID
router.get("/task/:id", async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({ task });
    } catch (error) {
        res.status(400).json({
            message: "Invalid task ID",
            error: error.message
        });
    }
});

// POST: Create a task
router.post("/createtask", async (req, res) => {
    try {
        const task = await Task.create({
            title: req.body.title
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not create task",
            error: error.message
        });
    }
});

// PUT: Update a task's title
router.put("/updatetask/:id", Validatetasktitle, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { title: req.body.title.trim() },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not update task",
            error: error.message
        });
    }
});

// PATCH: Update task completion status
router.patch("/task/:id", async (req, res) => {
    try {
        if (typeof req.body.completed !== "boolean") {
            return res.status(400).json({
                message: "completed must be true or false"
            });
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { completed: req.body.completed },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task status updated successfully",
            task
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not update task status",
            error: error.message
        });
    }
});

// DELETE: Delete a task
router.delete("/deletetask/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            task
        });
    } catch (error) {
        res.status(400).json({
            message: "Could not delete task",
            error: error.message
        });
    }
});

export default router;

