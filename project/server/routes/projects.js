import express from 'express';

export default function(db) {
  const router = express.Router();

  // Get all projects
  router.get('/', (req, res) => {
    try {
      res.json(db.projects);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch projects'
      });
    }
  });

  // Get project by ID
  router.get('/:id', (req, res) => {
    try {
      const project = db.projects.find(p => p._id === req.params.id);
      if (!project) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to fetch project'
      });
    }
  });

  // Create new project
  router.post('/', (req, res) => {
    try {
      const { name, description, startDate, endDate } = req.body;
      
      if (!name) {
        return res.status(400).json({
          status: 'error',
          message: 'Project name is required'
        });
      }

      const newProject = {
        _id: 'proj' + Date.now(),
        name,
        description: description || '',
        startDate: startDate || new Date().toISOString(),
        endDate: endDate || new Date(Date.now() + 30 * 86400000).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      db.projects.push(newProject);
      
      res.status(201).json(newProject);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to create project'
      });
    }
  });

  // Update project
  router.put('/:id', (req, res) => {
    try {
      const projectIndex = db.projects.findIndex(p => p._id === req.params.id);
      if (projectIndex === -1) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      }

      const updatedProject = {
        ...db.projects[projectIndex],
        ...req.body,
        updatedAt: new Date().toISOString()
      };

      db.projects[projectIndex] = updatedProject;
      
      res.json(updatedProject);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to update project'
      });
    }
  });

  // Delete project
  router.delete('/:id', (req, res) => {
    try {
      const projectIndex = db.projects.findIndex(p => p._id === req.params.id);
      if (projectIndex === -1) {
        return res.status(404).json({
          status: 'error',
          message: 'Project not found'
        });
      }

      const deletedProject = db.projects.splice(projectIndex, 1)[0];
      
      res.json(deletedProject);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete project'
      });
    }
  });

  return router;
}