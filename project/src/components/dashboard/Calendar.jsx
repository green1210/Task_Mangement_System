import { useState } from 'react';
import PropTypes from 'prop-types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const Calendar = ({ tasks, onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get month boundaries
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  const weekDayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const selectDate = (day) => {
    setSelectedDate(day);
    onSelectDate(day);
  };
  
  const checkIfDayHasTasks = (day) => {
    return tasks.some(task => {
      const taskDueDate = new Date(task.dueDate);
      return isSameDay(day, taskDueDate);
    });
  };

  const getTaskCountForDay = (day) => {
    return tasks.filter(task => {
      const taskDueDate = new Date(task.dueDate);
      return isSameDay(day, taskDueDate);
    }).length;
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200/60">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg animate-float">
            <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold heading-primary">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <p className="text-slate-500 text-xs">Task calendar</p>
          </div>
        </div>
        <div className="flex space-x-2 justify-center sm:justify-end">
          <button
            onClick={goToPreviousMonth}
            className="rounded-lg p-2 hover:bg-slate-100 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ChevronLeft size={16} className="text-slate-600" />
          </button>
          <button
            onClick={goToNextMonth}
            className="rounded-lg p-2 hover:bg-slate-100 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ChevronRight size={16} className="text-slate-600" />
          </button>
        </div>
      </div>
      
      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2 sm:mb-3">
        {weekDayLabels.map((dayLabel) => (
          <div key={dayLabel} className="py-1 sm:py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {dayLabel}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {daysInMonth.map((day) => {
          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          const dayHasTasks = checkIfDayHasTasks(day);
          const taskCount = getTaskCountForDay(day);
          
          return (
            <button
              key={day.toString()}
              onClick={() => selectDate(day)}
              className={`
                relative flex h-8 sm:h-10 w-full items-center justify-center rounded-lg text-xs font-medium transition-all duration-300 shadow-sm hover:shadow-md
                ${!isSameMonth(day, currentDate) ? 'text-slate-300' : 'text-slate-700'}
                ${isToday && !isSelected ? 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 border border-blue-200' : ''}
                ${isSelected ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg' : 'hover:bg-slate-100'}
              `}
            >
              {format(day, 'd')}
              {dayHasTasks && (
                <div className="absolute -top-1 -right-1">
                  <div className={`
                    flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4 rounded-full text-xs font-bold shadow-sm
                    ${isSelected ? 'bg-white text-blue-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'}
                  `}>
                    {taskCount > 9 ? '9' : taskCount}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired
  })).isRequired,
  onSelectDate: PropTypes.func.isRequired
};

export default Calendar;