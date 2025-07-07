import { useState } from 'react';
import PropTypes from 'prop-types';
import { X, CheckSquare, Sparkles, Target, Calendar, Flag } from 'lucide-react';

const TaskForm = ({ onSubmit, onClose }) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    project: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return;
    
    onSubmit(taskData);
    onClose();
  };

  const updateField = (e) => {
    const { name, value } = e.target;
    setTaskData(prevData => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-scale-in">
      <div className="glass-effect rounded-2xl w-full max-w-lg p-6 shadow-2xl border-2 border-white/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold heading-primary">Create New Task</h2>
              <p className="text-slate-500 text-sm">Add a new task to your list</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl p-2 transition-all"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
              <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={taskData.title}
              onChange={updateField}
              required
              placeholder="Enter a descriptive task title..."
              className="form-input w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none bg-white/80"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
              <Target className="h-4 w-4 mr-2 text-blue-500" />
              Description
            </label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={updateField}
              rows="3"
              placeholder="Describe what needs to be accomplished..."
              className="form-input w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none bg-white/80"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={taskData.status}
                onChange={updateField}
                className="form-input w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none bg-white/80 font-medium"
              >
                <option value="pending">📋 Pending</option>
                <option value="inProgress">⚡ In Progress</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>

            <div>
              <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
                <Flag className="h-4 w-4 mr-2 text-blue-500" />
                Priority
              </label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={updateField}
                className="form-input w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none bg-white/80 font-medium"
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={taskData.dueDate}
              onChange={updateField}
              className="form-input w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none bg-white/80"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Project (Optional)
            </label>
            <input
              type="text"
              name="project"
              value={taskData.project}
              onChange={updateField}
              placeholder="Assign to a project or leave blank..."
              className="form-input w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none bg-white/80"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full rounded-xl py-3 text-white font-bold shadow-xl hover:shadow-2xl"
          >
            ✨ Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

TaskForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TaskForm;
