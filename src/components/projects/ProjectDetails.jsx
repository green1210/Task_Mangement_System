import { useState } from 'react';
import PropTypes from 'prop-types';
import { X, FolderKanban, Calendar, Users, TrendingUp, Star, Target, Clock, Edit3, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const ProjectDetails = ({ project, onClose, onEdit, onDelete }) => {
  const [currentTab, setCurrentTab] = useState('overview');

  const handleEditClick = () => {
    onEdit(project);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      onDelete(project._id);
      onClose();
    }
  };

  // Mock some data for demo purposes
  const progressValue = Math.floor(Math.random() * 100);
  const totalTasks = Math.floor(Math.random() * 15) + 1;
  const finishedTasks = Math.floor(totalTasks * (progressValue / 100));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-scale-in">
      <div className="glass-effect rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border-2 border-white/30">
        {/* Header section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <FolderKanban className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{project.name}</h1>
                <p className="text-purple-100">Project Details & Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEditClick}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <Edit3 className="h-5 w-5" />
              </button>
              <button
                onClick={handleDeleteClick}
                className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300 backdrop-blur-sm"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="h-5 w-5 text-white" />
                <span className="font-semibold">Progress</span>
              </div>
              <div className="text-2xl font-bold mb-2">{progressValue}%</div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-1000"
                  style={{ width: `${progressValue}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-2">
                <Target className="h-5 w-5 text-white" />
                <span className="font-semibold">Tasks</span>
              </div>
              <div className="text-2xl font-bold">{finishedTasks}/{totalTasks}</div>
              <div className="text-sm text-purple-100">Completed</div>
            </div>
            
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-2">
                <Calendar className="h-5 w-5 text-white" />
                <span className="font-semibold">Created</span>
              </div>
              <div className="text-lg font-bold">
                {format(new Date(project.createdAt), 'MMM d, yyyy')}
              </div>
              <div className="text-sm text-purple-100">
                {format(new Date(project.createdAt), 'h:mm a')}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="border-b border-slate-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: FolderKanban },
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'team', label: 'Team', icon: Users }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium transition-all duration-300 ${
                    currentTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main content area */}
        <div className="p-6 overflow-y-auto max-h-96">
          {currentTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  Project Description
                </h3>
                <div className="bg-slate-50 rounded-2xl p-6">
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {project.description || 'No description has been provided for this project yet.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                    <Target className="h-5 w-5 text-blue-600 mr-2" />
                    Project Goals
                  </h4>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Complete all project milestones on time</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Maintain high quality standards throughout</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Deliver within budget and timeline</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                    <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                    Key Metrics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Completion Rate</span>
                      <span className="font-bold text-green-600">{progressValue}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Tasks Completed</span>
                      <span className="font-bold text-green-600">{finishedTasks}/{totalTasks}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Current Status</span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentTab === 'timeline' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                Project Timeline
              </h3>
              <div className="space-y-4">
                {[
                  { 
                    date: project.createdAt, 
                    title: 'Project Initialization', 
                    status: 'completed', 
                    description: 'Project was created and initial setup was completed' 
                  },
                  { 
                    date: new Date().toISOString(), 
                    title: 'Development Phase', 
                    status: 'current', 
                    description: 'Currently working on core features and main functionality' 
                  },
                  { 
                    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), 
                    title: 'Testing & QA', 
                    status: 'upcoming', 
                    description: 'Quality assurance testing and bug fixes' 
                  },
                  { 
                    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), 
                    title: 'Project Delivery', 
                    status: 'upcoming', 
                    description: 'Final delivery and project completion' 
                  }
                ].map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-4 h-4 rounded-full mt-1 ${
                      milestone.status === 'completed' ? 'bg-green-500' :
                      milestone.status === 'current' ? 'bg-blue-500' :
                      'bg-slate-300'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-slate-900">{milestone.title}</h4>
                        <span className="text-sm text-slate-500">
                          {format(new Date(milestone.date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <p className="text-slate-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentTab === 'team' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <Users className="h-5 w-5 text-purple-500 mr-2" />
                Team Members
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Project Owner', role: 'Lead', avatar: '👤', status: 'active' },
                  { name: 'Development Team', role: 'Developers', avatar: '👥', status: 'active' },
                  { name: 'Quality Assurance', role: 'Testing', avatar: '🔍', status: 'active' },
                  { name: 'Stakeholders', role: 'Review', avatar: '📋', status: 'active' }
                ].map((member, index) => (
                  <div key={index} className="bg-slate-50 rounded-2xl p-4 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center text-xl">
                      {member.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">{member.name}</h4>
                      <p className="text-slate-600 text-sm">{member.role}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ProjectDetails;
