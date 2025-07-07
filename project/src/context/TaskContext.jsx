import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true
});

export const TaskContext = createContext({
  tasks: [],
  loading: false,
  error: null,
  fetchTasks: async () => {},
  addTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
});

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/tasks');
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task) => {
    setLoading(true);
    try {
      const response = await apiClient.post('/tasks', task);
      setTasks([...tasks, response.data]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task');
      console.error('Error adding task:', err);
    } finally {
      setLoading(false);
    }
  };

  const modifyTask = async (id, task) => {
    setLoading(true);
    try {
      const response = await apiClient.put(`/tasks/${id}`, task);
      setTasks(tasks.map(t => (t._id === id ? response.data : t)));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
      console.error('Error updating task:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id) => {
    setLoading(true);
    try {
      await apiClient.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
      console.error('Error deleting task:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks: loadTasks,
        addTask: createTask,
        updateTask: modifyTask,
        deleteTask: removeTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired
};