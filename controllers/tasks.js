const { json } = require('body-parser');
const Task = require('../models/Task');
const mongoose = require("mongoose");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({tasks});
    } 
    catch (error) {
        console.log("Error reading tasks: ",error);
        res.send(500).json({error:"Failed to read tasks"});
    }
};

const createTask = async (req, res) => {
    try {
        const { name } = req.body;
        const task = await Task.create({name});
        res.status(201).send(task);
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
};

const getTask = async (req, res) => {
    try {
        const {id} = req.params;
        // Check if 'id' is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        const task = await Task.findById(id);
        if(!task) {
            res.status(404).json({task:"No task found"});
        }
        res.status(200).json({task});
    } 
    catch (error) {
        console.log('Error getting task:', error);
        res.status(500).json({error:"Failed to get task"});
    }
};

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        // Check if 'id' is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        const task = await Task.findByIdAndDelete(id);
        if(!task) {
            res.status(404).json({task:"No task found"});
        }
        res.send("deleted");
    } 
    catch (error) {
        console.log('Error deleting task:', error);
        res.status(500).json({error:"Failed to delete task"});
    }
};


const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name,completed } = req.body;
        // Check if 'name' is present and non-empty
        if (!name || name.trim() === '') {
            return res.status(400).json({ error: "Task name is required and cannot be empty" });
        }
        // Check if 'id' is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid task ID" });
        }
        const updatedTask = await Task.findByIdAndUpdate(id, { name,completed }, { new: true, runValidators: true });
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ task: updatedTask });
    } 
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: "Failed to update task" });
    }
};



module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }