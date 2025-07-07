import { useState } from 'react';
import PropTypes from 'prop-types';
import { X, FolderKanban, Rocket, Target } from 'lucide-react';

const ProjectEditForm = ({ project, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description || ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSubmit(project._id, formData);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-scale-in">
      <div className="glass-effect rounded-2xl w-full max-w-lg p-6 shadow-2xl border-2 border-white/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
              <FolderKanban className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold heading-primary">Edit Project</h2>
              <p className="text-slate-500 text-sm">Update project information</p>
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
              <Rocket className="h-4 w-4 mr-2 text-purple-500" />
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Enter project name..."
              className="form-input w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-purple-500 focus:outline-none bg-white/80"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-bold text-slate-700 mb-2">
              <Target className="h-4 w-4 mr-2 text-purple-500" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              placeholder="Describe the project goals..."
              className="form-input w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-purple-500 focus:outline-none resize-none bg-white/80"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-secondary rounded-xl py-3 text-white font-bold shadow-xl hover:shadow-2xl"
            >
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProjectEditForm.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ProjectEditForm;
