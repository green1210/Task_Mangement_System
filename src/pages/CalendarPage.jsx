import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Star, Plus } from 'lucide-react';
import TaskForm from '../components/forms/TaskForm';

const CalendarPage = () => {
  const { tasks, addTask } = useContext(TaskContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTaskForm, setShowTaskForm] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const handleDateClick = (day) => {
    setSelectedDate(day);
  };
  
  const getTasksForDate = (day) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return isSameDay(day, taskDate);
    });
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
    } catch (err) {
      alert('Failed to add task');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/30 border border-slate-200/60 shadow-xl p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative flex items-center justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg animate-float">
                <CalendarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold heading-primary mb-2">Calendar</h1>
                <p className="text-base sm:text-lg text-slate-600">Manage your schedule and tasks</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowTaskForm(true)}
            className="btn-primary flex items-center gap-3 rounded-xl px-6 py-3 text-white font-semibold text-base shadow-xl hover:shadow-2xl"
          >
            <Plus className="h-5 w-5" />
            New Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/60">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold heading-primary">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={prevMonth}
                className="rounded-lg p-2 hover:bg-slate-100 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ChevronLeft size={20} className="text-slate-600" />
              </button>
              <button
                onClick={nextMonth}
                className="rounded-lg p-2 hover:bg-slate-100 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ChevronRight size={20} className="text-slate-600" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="py-2 text-center text-xs font-semibold text-slate-500">
                {day.slice(0, 3)}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {days.map((day) => {
              const isToday = isSameDay(day, new Date());
              const isSelected = isSameDay(day, selectedDate);
              const dayTasks = getTasksForDate(day);
              
              return (
                <button
                  key={day.toString()}
                  onClick={() => handleDateClick(day)}
                  className={`
                    relative p-3 rounded-lg text-xs font-medium transition-all duration-300 min-h-[60px] flex flex-col items-start shadow-sm hover:shadow-md
                    ${!isSameMonth(day, currentDate) ? 'text-slate-300' : 'text-slate-700'}
                    ${isToday && !isSelected ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 border border-blue-200' : ''}
                    ${isSelected ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg' : 'hover:bg-slate-100'}
                  `}
                >
                  <span className="mb-1 text-sm">{format(day, 'd')}</span>
                  {dayTasks.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {dayTasks.slice(0, 2).map((task, index) => (
                        <div
                          key={index}
                          className={`w-1.5 h-1.5 rounded-full ${
                            task.priority === 'high' ? 'bg-red-400' :
                            task.priority === 'medium' ? 'bg-yellow-400' :
                            'bg-green-400'
                          }`}
                        />
                      ))}
                      {dayTasks.length > 2 && (
                        <span className="text-xs">+{dayTasks.length - 2}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Tasks */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/60">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold heading-primary mb-2">
              {format(selectedDate, 'EEEE, MMMM d')}
            </h3>
            <p className="text-slate-500 text-sm">
              {selectedDateTasks.length} {selectedDateTasks.length === 1 ? 'task' : 'tasks'} scheduled
            </p>
          </div>

          {selectedDateTasks.length === 0 ? (
            <div className="empty-state text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CalendarIcon size={24} className="text-slate-400" />
              </div>
              <h4 className="text-lg font-semibold text-slate-700 mb-2">No tasks scheduled</h4>
              <p className="text-slate-500 mb-4 text-sm">Add a task to get started</p>
              <button 
                onClick={() => setShowTaskForm(true)}
                className="btn-primary px-4 py-2 rounded-lg text-white font-medium text-sm"
              >
                Add Task
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateTasks.map((task, index) => (
                <div 
                  key={task._id} 
                  className="task-card rounded-xl p-4 shadow-lg border border-slate-200/60"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-slate-900 text-base">{task.title}</h4>
                    {task.priority === 'high' && (
                      <Star className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-slate-600 mb-3 leading-relaxed text-sm">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-xs text-slate-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {format(new Date(task.dueDate), 'h:mm a')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      task.status === 'completed' ? 'bg-green-100 text-green-700' :
                      task.status === 'inProgress' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {task.status === 'inProgress' ? 'In Progress' : task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showTaskForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onClose={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
};

export default CalendarPage;
