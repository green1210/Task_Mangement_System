import PropTypes from 'prop-types';
import { format, isSameDay } from 'date-fns';
import { Clock, Star, CheckSquare, Calendar as CalendarIcon } from 'lucide-react';

const UpcomingTasks = ({ tasks, selectedDate }) => {
  // Filter tasks for the selected date
  const selectedDateTasks = tasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    return isSameDay(taskDate, selectedDate);
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'inProgress':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200/60">
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-2">
          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg animate-float">
            <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold heading-primary">
              {format(selectedDate, 'EEEE, MMMM d')}
            </h3>
            <p className="text-slate-500 text-sm">
              {selectedDateTasks.length} {selectedDateTasks.length === 1 ? 'task' : 'tasks'} scheduled
            </p>
          </div>
        </div>
      </div>

      {selectedDateTasks.length === 0 ? (
        <div className="empty-state text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <CheckSquare size={24} className="text-slate-400" />
          </div>
          <h4 className="text-lg font-semibold text-slate-700 mb-2">No tasks scheduled</h4>
          <p className="text-slate-500 text-sm">Enjoy your free day!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {selectedDateTasks.map((task, index) => (
            <div 
              key={task._id} 
              className="task-card rounded-xl p-4 shadow-lg border border-slate-200/60 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-slate-900 text-base group-hover:text-blue-700 transition-colors">
                      {task.title}
                    </h4>
                    {task.priority === 'high' && (
                      <Star className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-slate-600 mb-3 leading-relaxed line-clamp-2 text-sm">
                    {task.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="flex items-center text-slate-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {format(new Date(task.dueDate), 'h:mm a')}
                    </span>
                    <span className={`px-2 py-1 rounded-full font-semibold border text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    {task.project && (
                      <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full font-medium border border-purple-200 text-xs">
                        {task.project}
                      </span>
                    )}
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                  {task.status === 'inProgress' ? 'In Progress' : task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

UpcomingTasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    project: PropTypes.string
  })).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired
};

export default UpcomingTasks;
