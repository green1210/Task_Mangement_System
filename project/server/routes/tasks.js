import express from 'express';

export default function(db) {
  const router = express.Router();

  // Get all tasks
  router.get('/', (req, res) => {
    try {
      res.json(db.tasks);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch tasks'
      });
    }
  });

  // Get task by ID
  router.get('/:id', (req, res) => {
    try {
      const task = db.tasks.find(t => t._id === req.params.id);
      if (!task) {
        return res.status(404).json({
          status: 'error',
          message: 'Task not found'
        });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch task'
      });
    }
  });

  // Create new task
  router.post('/', (req, res) => {
    try {
      const { title, description, status = 'pending', priority = 'medium', dueDate, project } = req.body;
      
      if (!title) {
        return res.status(400).json({
          status: 'error',
          message: 'Title is required'
        });
      }

      const newTask = {
        _id: 'task' + Date.now(),
        title,
        description: description || '',
        status,
        priority,
        dueDate: dueDate || new Date().toISOString(),
        project: project || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      db.tasks.push(newTask);
      
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to create task'
      });
    }
  });

  // Update task
  router.put('/:id', (req, res) => {
    try {
      const taskIndex = db.tasks.findIndex(t => t._id === req.params.id);
      if (taskIndex === -1) {
        return res.status(404).json({
          status: 'error',
          message: 'Task not found'
        });
      }

      const updatedTask = {
        ...db.tasks[taskIndex],
        ...req.body,
        updatedAt: new Date().toISOString()
      };

      db.tasks[taskIndex] = updatedTask;
      
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to update task'
      });
    }
  });

  // Delete task
  router.delete('/:id', (req, res) => {
    try {
      const taskIndex = db.tasks.findIndex(t => t._id === req.params.id);
      if (taskIndex === -1) {
        return res.status(404).json({
          status: 'error',
          message: 'Task not found'
        });
      }

      const deletedTask = db.tasks.splice(taskIndex, 1)[0];
      
      res.json(deletedTask);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete task'
      });
    }
  });

  return router;
}