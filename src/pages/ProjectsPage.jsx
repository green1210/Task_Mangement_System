import { useState, useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { Plus, Search, Trash2, FolderKanban, Calendar, Users, TrendingUp, Star, Target } from 'lucide-react';
import ProjectForm from '../components/forms/ProjectForm';
import ProjectDetails from '../components/projects/ProjectDetails';
import ProjectEditForm from '../components/projects/ProjectEditForm';

const ProjectsPage = () => {
  const { projects, addProject, deleteProject, updateProject } = useContext(ProjectContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const handleCreateProject = async (projectData) => {
    try {
      await addProject(projectData);
    } catch (err) {
      alert('Failed to create project');
    }
  };

  const handleRemoveProject = async (projectId) => {
    try {
      await deleteProject(projectId);
    } catch (err) {
      alert('Failed to remove project');
    }
  };

  const handleModifyProject = async (projectId, projectData) => {
    try {
      await updateProject(projectId, projectData);
    } catch (err) {
      alert('Failed to modify project');
    }
  };

  const showProjectDetails = (project) => {
    setSelectedProject(project);
  };

  const startEditingProject = (project) => {
    setEditingProject(project);
    setSelectedProject(null);
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Page header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-purple-50 border border-slate-200/60 shadow-xl p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg animate-float">
                <FolderKanban className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold heading-primary mb-2">
                  Project Portfolio
                </h1>
                <p className="text-base sm:text-lg text-slate-600">
                  Organize and manage your initiatives ({projects.length} total projects)
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowProjectForm(true)}
            className="btn-secondary flex items-center gap-3 rounded-xl px-6 py-3 text-white font-semibold text-base shadow-xl hover:shadow-2xl"
          >
            <Plus className="h-5 w-5" />
            New Project
          </button>
        </div>
      </div>

      {/* Search functionality */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-input w-full rounded-xl border-2 border-slate-200 pl-12 pr-4 py-3 text-slate-900 placeholder-slate-500 focus:border-purple-500 focus:outline-none bg-white/80 backdrop-blur-sm text-base"
        />
      </div>

      {/* Projects display */}
      {filteredProjects.length === 0 ? (
        <div className="empty-state text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <FolderKanban size={36} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700 mb-4 heading-secondary">
            {searchQuery ? 'No projects found' : 'No projects yet'}
          </h3>
          <p className="text-lg text-slate-500 mb-6 max-w-md mx-auto">
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first project to organize your tasks and boost productivity'}
          </p>
          {!searchQuery && (
            <button 
              onClick={() => setShowProjectForm(true)}
              className="btn-secondary px-6 py-3 rounded-xl text-white font-semibold text-base"
            >
              Create Your First Project
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <div
              key={project._id}
              className="project-card rounded-2xl p-6 shadow-xl border border-slate-200/60 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                      <FolderKanban className="h-5 w-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors heading-secondary">
                      {project.name}
                    </h3>
                    <div className="p-0.5 bg-green-100 rounded-full">
                      <Star className="h-3 w-3 text-green-500" />
                    </div>
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed mb-4">
                    {project.description || 'No description provided'}
                  </p>
                </div>
                <button 
                  onClick={() => handleRemoveProject(project._id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              {/* Progress indicator */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="flex items-center text-slate-600 font-semibold">
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

              {/* Project info */}
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="flex items-center text-slate-500 bg-slate-100 rounded-full px-2 py-1 font-medium">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center text-slate-500 bg-slate-100 rounded-full px-2 py-1 font-medium">
                  <Users className="h-3 w-3 mr-1" />
                  Active
                </span>
              </div>

              {/* View details button */}
              <button 
                onClick={() => showProjectDetails(project)}
                className="w-full bg-gradient-to-r from-slate-50 to-slate-100 hover:from-purple-50 hover:to-purple-100 border-2 border-slate-200 hover:border-purple-300 rounded-xl py-3 text-slate-700 hover:text-purple-700 font-semibold text-base transition-all duration-300 group-hover:shadow-lg"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>View Details</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal components */}
      {showProjectForm && (
        <ProjectForm
          onSubmit={handleCreateProject}
          onClose={() => setShowProjectForm(false)}
        />
      )}

      {selectedProject && (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onEdit={startEditingProject}
          onDelete={handleRemoveProject}
        />
      )}

      {editingProject && (
        <ProjectEditForm
          project={editingProject}
          onSubmit={handleModifyProject}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
