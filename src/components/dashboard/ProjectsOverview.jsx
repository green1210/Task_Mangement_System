import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FolderKanban, Trash2, ArrowRight, Calendar, Users, TrendingUp, Star } from 'lucide-react';
import { ProjectContext } from '../../context/ProjectContext';

const ProjectsOverview = ({ projects }) => {
  const { deleteProject } = useContext(ProjectContext);
  const navigate = useNavigate();

  const handleProjectDelete = async (e, projectId) => {
    e.stopPropagation();
    const confirmDelete = window.confirm('Delete this project? This action cannot be undone.');
    if (confirmDelete) {
      try {
        await deleteProject(projectId);
      } catch (error) {
        alert('Failed to delete project');
      }
    }
  };

  return (
    <div className="project-card rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200/60">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
            <FolderKanban className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold heading-secondary">Active Projects</h2>
            <p className="text-slate-500 text-sm">Your ongoing initiatives</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/projects')}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors bg-purple-50 hover:bg-purple-100 rounded-lg px-3 py-2 text-sm"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <FolderKanban size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No projects yet</h3>
          <p className="text-slate-500 mb-4 text-sm">Create your first project to organize tasks and boost productivity</p>
          <button 
            onClick={() => navigate('/projects')}
            className="btn-secondary px-4 py-2 rounded-lg text-white font-medium text-sm"
          >
            Create First Project
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {projects.slice(0, 3).map((project, projectIndex) => (
            <div 
              key={project._id} 
              className="group bg-gradient-to-r from-white via-slate-50/50 to-white rounded-xl p-4 border border-slate-200/60 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-lg"
              style={{ animationDelay: `${projectIndex * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="p-1.5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                      <FolderKanban className="h-4 w-4 text-purple-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-purple-700 transition-colors">
                      {project.name}
                    </h3>
                    <div className="p-0.5 bg-green-100 rounded-full">
                      <Star className="h-2.5 w-2.5 text-green-500" />
                    </div>
                  </div>
                  <p className="text-slate-600 mb-3 leading-relaxed line-clamp-2 text-sm">
                    {project.description || 'No description provided'}
                  </p>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="flex items-center text-slate-500 bg-slate-100 rounded-full px-2 py-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center text-slate-500 bg-slate-100 rounded-full px-2 py-1">
                      <Users className="h-3 w-3 mr-1" />
                      Active
                    </span>
                  </div>
                </div>
                <button 
                  onClick={(e) => handleProjectDelete(e, project._id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Progress indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center text-slate-600 font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Progress
                  </span>
                  <span className="font-bold text-slate-700 text-sm">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
                <div className="progress-bar w-full h-2 shadow-inner">
                  <div 
                    className="progress-fill bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-lg shadow-sm"
                    style={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
          
          {projects.length > 3 && (
            <div className="text-center pt-3">
              <button 
                onClick={() => navigate('/projects')}
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors bg-purple-50 hover:bg-purple-100 rounded-lg px-4 py-2 text-sm"
              >
                View {projects.length - 3} more projects
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ProjectsOverview.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  })).isRequired
};

export default ProjectsOverview;
