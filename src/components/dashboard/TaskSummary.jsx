import PropTypes from 'prop-types';
import { CheckCircle2, Clock, AlertCircle, TrendingUp, Target, Zap } from 'lucide-react';

const TaskSummary = ({ pendingTasks, inProgressTasks, completedTasks }) => {
  const totalTasks = pendingTasks + inProgressTasks + completedTasks;

  // Define card configurations
  const cardConfigs = [
    {
      count: pendingTasks,
      label: 'Pending Tasks',
      sublabel: 'Awaiting action',
      icon: AlertCircle,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      borderColor: 'border-amber-200',
      percentage: totalTasks > 0 ? (pendingTasks / totalTasks) * 100 : 0,
      iconBg: 'from-amber-500 to-orange-600'
    },
    {
      count: inProgressTasks,
      label: 'In Progress',
      sublabel: 'Active work',
      icon: Zap,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      percentage: totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0,
      iconBg: 'from-blue-500 to-indigo-600'
    },
    {
      count: completedTasks,
      label: 'Completed',
      sublabel: 'Finished tasks',
      icon: Target,
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-200',
      percentage: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      iconBg: 'from-emerald-500 to-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cardConfigs.map((cardData, idx) => {
        const IconComponent = cardData.icon;
        
        return (
          <div 
            key={cardData.label}
            className={`summary-card rounded-2xl p-3 sm:p-4 lg:p-5 shadow-xl border-2 ${cardData.borderColor} bg-gradient-to-br ${cardData.bgGradient} card-hover group`}
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="flex items-start justify-between mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 bg-gradient-to-br ${cardData.iconBg} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-right">
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-1">
                  {cardData.count}
                </p>
                <p className="text-xs font-semibold text-slate-600 mb-1">
                  {cardData.label}
                </p>
                <p className="text-xs text-slate-500 hidden sm:block">
                  {cardData.sublabel}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Progress</span>
                <span className="font-bold text-slate-700">
                  {cardData.percentage.toFixed(0)}%
                </span>
              </div>
              <div className="progress-bar w-full h-2 shadow-inner">
                <div 
                  className={`progress-fill bg-gradient-to-r ${cardData.gradient} h-2 rounded-lg shadow-sm`}
                  style={{ width: `${cardData.percentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Bottom decoration */}
            <div className="mt-3 sm:mt-4 flex justify-between items-center">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, dotIndex) => (
                  <div 
                    key={dotIndex}
                    className={`w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-r ${cardData.gradient} rounded-full opacity-60 animate-pulse`}
                    style={{ animationDelay: `${dotIndex * 0.2}s` }}
                  ></div>
                ))}
              </div>
              <div className="text-xs text-slate-500 font-medium bg-white/50 rounded-full px-2 py-0.5">
                {totalTasks > 0 ? `${cardData.count}/${totalTasks}` : '0/0'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

TaskSummary.propTypes = {
  pendingTasks: PropTypes.number.isRequired,
  inProgressTasks: PropTypes.number.isRequired,
  completedTasks: PropTypes.number.isRequired
};

export default TaskSummary;
