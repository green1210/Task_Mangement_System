import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { format } from 'date-fns';
import { Plus, Search, CheckCircle, Clock, AlertTriangle, Trash2, Filter, Calendar, Star, Target } from 'lucide-react';
import TaskForm from '../components/forms/TaskForm';

const TasksPage = () => {
  const { tasks, addTask, deleteTask, updateTask } = useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showTaskForm, setShowTaskForm] = useState(false);

  const filteredTasks = tasks
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(task => 
      filterStatus === 'all' ? true : task.status === filterStatus
    );

  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
    } catch (err) {
      alert('Failed to add task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Delete this task? This action cannot be undone.')) {
      try {
        await deleteTask(taskId);
      } catch (err) {
        alert('Failed to delete task');
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const task = tasks.find(t => t._id === taskId);
    if (task) {
      try {
        await updateTask(taskId, { ...task, status: newStatus });
      } catch (err) {
        alert('Failed to update task');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Target className="w-5 h-5 text-emerald-500" />;
      case 'inProgress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      default:
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 via-white to-indigo-50 border border-slate-200/60 shadow-xl p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg animate-float">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold heading-primary mb-2">
                  Task Management
                </h1>
                <p className="text-base sm:text-lg text-slate-600">
                  Organize and track your productivity ({tasks.length} total tasks)
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowTaskForm(true)}
            className="btn-primary flex items-center gap-3 rounded-xl px-6 py-3 text-white font-semibold text-base shadow-xl hover:shadow-2xl"
          >
            <Plus className="h-5 w-5" />
            Create Task
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input w-full rounded-xl border-2 border-slate-200 pl-12 pr-4 py-3 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none bg-white/80 backdrop-blur-sm text-base"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="form-input appearance-none rounded-xl border-2 border-slate-200 pl-12 pr-8 py-3 text-slate-900 focus:border-blue-500 focus:outline-none bg-white/80 backdrop-blur-sm text-base font-medium"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle size={36} className="text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700 mb-4 heading-secondary">
            {searchTerm ? 'No tasks found' : 'No tasks yet'}
          </h3>
          <p className="text-lg text-slate-500 mb-6 max-w-md mx-auto">
            {searchTerm ? 'Try adjusting your search terms or filters' : 'Create your first task to get started with productivity'}
          </p>
          {!searchTerm && (
            <button 
              onClick={() => setShowTaskForm(true)}
              className="btn-primary px-6 py-3 rounded-xl text-white font-semibold text-base"
            >
              Create Your First Task
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredTasks.map((task, index) => (
            <div
              key={task._id}
              className="task-card rounded-2xl p-6 shadow-xl border border-slate-200/60 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                      <div className="scale-75">{getStatusIcon(task.status)}</div>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors">
                      {task.title}
                    </h3>
                    {task.priority === 'high' && (
                      <div className="p-1 bg-red-100 rounded-lg">
                        <Star className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                  </div>
                  <p className="text-slate-600 mb-4 leading-relaxed text-base">{task.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center text-slate-500 bg-slate-100 rounded-full px-3 py-1.5 font-medium text-xs">
                      <Calendar className="mr-2 h-3 w-3" />
                      Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    </span>
                    <span className={`px-3 py-1.5 rounded-full font-bold text-xs border ${getPriorityColor(task.priority)}`}>
                      {task.priority} priority
                    </span>
                    {task.project && (
                      <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1.5 rounded-full font-bold text-xs border border-purple-200">
                        {task.project}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-6">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                    className="form-input rounded-lg border-2 border-slate-200 px-3 py-2 text-slate-900 font-medium focus:border-blue-500 focus:outline-none bg-white text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  
                  <button 
                    onClick={() => handleDeleteTask(task._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showTaskForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onClose={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
};

export default TasksPage;