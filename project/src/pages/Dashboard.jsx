import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { ProjectContext } from '../context/ProjectContext';
import TaskSummary from '../components/dashboard/TaskSummary';
import ProjectsOverview from '../components/dashboard/ProjectsOverview';
import Calendar from '../components/dashboard/Calendar';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import { Plus, CheckSquare, Calendar as CalendarIcon, Clock, Star, Zap, Target } from 'lucide-react';
import ProjectForm from '../components/forms/ProjectForm';
import TaskForm from '../components/forms/TaskForm';

const Dashboard = () => {
  const { tasks, addTask } = useContext(TaskContext);
  const { projects, addProject } = useContext(ProjectContext);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Count tasks by status
  const pendingTaskCount = tasks.filter(task => task.status === 'pending').length;
  const inProgressTaskCount = tasks.filter(task => task.status === 'inProgress').length;
  const completedTaskCount = tasks.filter(task => task.status === 'completed').length;

  const createNewProject = async (projectData) => {
    try {
      await addProject(projectData);
    } catch (error) {
      alert('Failed to add project');
    }
  };

  const createNewTask = async (taskData) => {
    try {
      await addTask(taskData);
    } catch (error) {
      alert('Failed to add task');
    }
  };

  // Get most recent tasks
  const recentTaskList = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return { text: 'Good Morning', icon: '🌅', color: 'from-amber-400 to-orange-500' };
    if (currentHour < 17) return { text: 'Good Afternoon', icon: '☀️', color: 'from-blue-400 to-indigo-500' };
    return { text: 'Good Evening', icon: '🌙', color: 'from-purple-400 to-pink-500' };
  };

  const greetingData = getCurrentGreeting();

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
      {/* Main header section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 border border-slate-200/60 shadow-xl p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full -translate-y-16 sm:-translate-y-24 translate-x-16 sm:translate-x-24"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-tr from-pink-100/50 to-yellow-100/50 rounded-full translate-y-12 sm:translate-y-16 -translate-x-12 sm:-translate-x-16"></div>
        
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className={`p-2 sm:p-3 bg-gradient-to-r ${greetingData.color} rounded-xl shadow-lg animate-float`}>
                <span className="text-lg sm:text-xl">{greetingData.icon}</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold heading-primary mb-1">
                  {greetingData.text}!
                </h1>
                <p className="text-sm sm:text-base text-slate-600 flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                  <span className="hidden sm:inline">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                  <span className="sm:hidden">
                    {new Date().toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <Target className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                <span className="font-medium">{completedTaskCount} completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
                <span className="font-medium">{inProgressTaskCount} in progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
                <span className="font-medium">{projects.length} projects</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button 
              onClick={() => setShowTaskForm(true)}
              className="btn-primary flex items-center justify-center gap-2 rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">New Task</span>
              <span className="sm:hidden">Task</span>
            </button>
            <button 
              onClick={() => setShowProjectForm(true)}
              className="btn-secondary flex items-center justify-center gap-2 rounded-xl px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold text-sm sm:text-base shadow-xl hover:shadow-2xl"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">New Project</span>
              <span className="sm:hidden">Project</span>
            </button>
          </div>
        </div>
      </div>
      
      <TaskSummary
        pendingTasks={pendingTaskCount}
        inProgressTasks={inProgressTaskCount}
        completedTasks={completedTaskCount}
      />

      <div className="grid grid-cols-1 gap-6 sm:gap-8 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <ProjectsOverview projects={projects} />
        </div>
        
        {/* Calendar component */}
        <div className="xl:col-span-1">
          <Calendar 
            tasks={tasks} 
            onSelectDate={setSelectedDate}
          />
        </div>
        
        {/* Tasks for selected date */}
        <div className="xl:col-span-1">
          <UpcomingTasks 
            tasks={tasks}
            selectedDate={selectedDate}
          />
        </div>
      </div>

      {/* Recent activity section */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200/60">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg animate-float">
              <CheckSquare className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold heading-primary">Recent Tasks</h2>
              <p className="text-slate-500 text-sm sm:text-base">Your latest activities</p>
            </div>
          </div>
        </div>
        
        {recentTaskList.length === 0 ? (
          <div className="empty-state text-center py-12 sm:py-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <CheckSquare size={20} className="sm:w-6 sm:h-6 text-slate-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-2">No tasks yet</h3>
            <p className="text-slate-500 mb-4 sm:mb-6 text-sm sm:text-base">Create your first task to get started</p>
            <button 
              onClick={() => setShowTaskForm(true)}
              className="btn-primary px-4 py-2 rounded-lg text-white font-medium text-sm"
            >
              Create First Task
            </button>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {recentTaskList.map((task, taskIndex) => (
              <div 
                key={task._id} 
                className="task-card rounded-xl p-4 sm:p-5 shadow-lg border border-slate-200/60 group"
                style={{ animationDelay: `${taskIndex * 100}ms` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                      <h3 className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors truncate">
                        {task.title}
                      </h3>
                      {task.priority === 'high' && (
                        <div className="p-0.5 bg-red-100 rounded-full flex-shrink-0">
                          <Star className="h-3 w-3 text-red-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-slate-600 mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm line-clamp-2">{task.description}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                      <span className="flex items-center text-slate-500 bg-slate-100 rounded-full px-2 py-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      {task.project && (
                        <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full font-medium border border-purple-200 truncate max-w-24 sm:max-w-32">
                          {task.project}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      task.status === 'completed' ? 'bg-green-100 text-green-700' :
                      task.status === 'inProgress' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {task.status === 'inProgress' ? 'In Progress' : task.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inspirational quote section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30 border border-slate-200/60 shadow-xl p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-8 sm:-translate-y-12 translate-x-8 sm:translate-x-12"></div>
        <div className="relative text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 sm:mb-4 shadow-lg animate-float">
            <Star className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <blockquote className="text-base sm:text-lg font-semibold text-slate-700 mb-2 sm:mb-3 heading-secondary">
            "Don't focus on the result, Focus on the process."
          </blockquote>
          <cite className="text-slate-500 font-medium text-sm sm:text-base">— M.S.Dhoni</cite>
        </div>
      </div>

      {showProjectForm && (
        <ProjectForm
          onSubmit={createNewProject}
          onClose={() => setShowProjectForm(false)}
        />
      )}

      {showTaskForm && (
        <TaskForm
          onSubmit={createNewTask}
          onClose={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;