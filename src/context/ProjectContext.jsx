import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true
});

export const ProjectContext = createContext({
  projects: [],
  loading: false,
  error: null,
  fetchProjects: async () => {},
  addProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
});

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/projects');
      setProjects(response.data || []);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch projects';
      setError(errorMessage);
      console.error('Error fetching projects:', err);
      // Don't throw error, just set it in state
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (project) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/projects', project);
      const newProject = response.data;
      setProjects(prevProjects => [...prevProjects, newProject]);
      return newProject;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to add project';
      setError(errorMessage);
      console.error('Error adding project:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const modifyProject = async (id, project) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.put(`/projects/${id}`, project);
      const updatedProject = response.data;
      setProjects(prevProjects => 
        prevProjects.map(p => (p._id === id ? updatedProject : p))
      );
      return updatedProject;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update project';
      setError(errorMessage);
      console.error('Error updating project:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/projects/${id}`);
      setProjects(prevProjects => prevProjects.filter(p => p._id !== id));
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete project';
      setError(errorMessage);
      console.error('Error deleting project:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        fetchProjects: loadProjects,
        addProject: createProject,
        updateProject: modifyProject,
        deleteProject: removeProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

ProjectProvider.propTypes = {
  children: PropTypes.node.isRequired
};
