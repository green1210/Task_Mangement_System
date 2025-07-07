import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import taskRoutes from './routes/tasks.js';
import projectRoutes from './routes/projects.js';

// Config
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory storage with some sample data
const db = {
  tasks: [
    {
      _id: 'task1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new feature',
      status: 'pending',
      priority: 'high',
      dueDate: new Date().toISOString(),
      project: 'Documentation Project',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'task2',
      title: 'Review code changes',
      description: 'Review and approve pending pull requests',
      status: 'inProgress',
      priority: 'medium',
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      project: 'Code Review',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  projects: [
    {
      _id: 'proj1',
      name: 'Documentation Project',
      description: 'Comprehensive documentation for all features',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 86400000).toISOString(), // 30 days from now
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      _id: 'proj2',
      name: 'Code Review System',
      description: 'Implement automated code review workflows',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 45 * 86400000).toISOString(), // 45 days from now
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]
};

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/tasks', taskRoutes(db));
app.use('/projects', projectRoutes(db));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    server: 'running',
    timestamp: new Date().toISOString(),
    data: {
      tasks: db.tasks.length,
      projects: db.projects.length
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  res.status(statusCode).json({ 
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler - Must be last
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Sample data loaded: ${db.tasks.length} tasks, ${db.projects.length} projects`);
});