import express from "express";
import Validatetasktitle from "./middleware/validatetaktitle.js";

const router = express.Router();

// GET: Read tasks
router.get("/task", (req, res) => {
    res.status(200).json({
        message: "This is all tasks"
    });
});
// Create  task 
router.post('/createtask', Validatetasktitle, (req, res)=>{
  const task = req.body;
  res.status(201).json({
    message: "task created Successfully", 
    task: task
});
})

// Update task
router.put('/updatetask/:id', (req, res)=>{
    const taskid= req.params.id;
    const updatedTask = req.body;
   res.status(200).json({
        title: updatedTask.title,
        id: taskid,
        message: "Task updated"
    });
});
// delete task
router.delete('/deletetask/:id', (req, res)=>{
    res.json({
        id: req.params.id,
        message: "Task deleted"
    });
});


export default  router;