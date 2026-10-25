import express from "express";
import { randomUUID } from "node:crypto";
import Validatetasktitle from "../middleware/validatetaktitle.js";

const router = express.Router();

// Temporary storage
const tasks = [];

// GET: Read tasks
router.get("/task", (req, res) => {
    res.status(200).json({
        count: tasks.length,
        tasks
    });
});


// GET: Read one task by ID
router.get("/task/:id", (req, res) => {
    const task = tasks.find(
        (item) => item.id === req.params.id
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.status(200).json({ task });
});
// Create  task 
router.post('/createtask', Validatetasktitle, (req, res)=>{
  const task = {
        id: randomUUID(),
        title: req.body.title.trim(),
        completed: false
    };
    tasks.push(task);
    res.status(201).json({
        message: "Task created successfully",
        task
    });
});

// Update task
router.put('/updatetask/:id', (req, res)=>{
    const task = tasks.find(
        (item) => item.id === req.params.id
    );

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    task.title = req.body.title.trim();

    res.status(200).json({
        message: "Task updated successfully",
        task
    });
});
// delete task
router.delete('/deletetask/:id', (req, res)=>{
    const index = tasks.findIndex(
        (item) => item.id === req.params.id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    const deletedTask = tasks.splice(index, 1)[0];

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask
    });
});


export default  router;