import { Outlet, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, FolderKanban, Calendar, Layers } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  const checkIfActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Mobile Navigation Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button className="p-3 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg border border-slate-200/60">
          <Layers className="h-6 w-6 text-slate-700" />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-xl border-r border-slate-200/60 shadow-xl z-40 transform lg:translate-x-0 -translate-x-full transition-transform duration-300">
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-center border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="TaskFlow Logo" 
                className="h-8 w-8 rounded-xl shadow-lg animate-float"
                onError={(e) => {
                  // Fallback to gradient background if logo fails to load
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              <div className="p-2 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl shadow-lg animate-float hidden">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.66 0 3.21.45 4.55 1.24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 4l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold heading-primary">TaskFlow</h1>
              <p className="text-xs text-slate-500 font-medium">Pro</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="p-4 space-y-2">
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Workspace</p>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className={`nav-item flex items-center rounded-xl px-3 py-3 transition-all duration-300 ${
                    checkIfActive('/') 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-md' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                    checkIfActive('/') 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md' 
                      : 'bg-slate-100'
                  }`}>
                    <LayoutDashboard className={`h-4 w-4 ${checkIfActive('/') ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm truncate block">Dashboard</span>
                    <p className="text-xs text-slate-500 truncate">Overview & insights</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/tasks"
                  className={`nav-item flex items-center rounded-xl px-3 py-3 transition-all duration-300 ${
                    checkIfActive('/tasks') 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-md' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                    checkIfActive('/tasks') 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md' 
                      : 'bg-slate-100'
                  }`}>
                    <CheckSquare className={`h-4 w-4 ${checkIfActive('/tasks') ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm truncate block">Tasks</span>
                    <p className="text-xs text-slate-500 truncate">Manage your work</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={`nav-item flex items-center rounded-xl px-3 py-3 transition-all duration-300 ${
                    checkIfActive('/projects') 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-md' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                    checkIfActive('/projects') 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md' 
                      : 'bg-slate-100'
                  }`}>
                    <FolderKanban className={`h-4 w-4 ${checkIfActive('/projects') ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm truncate block">Projects</span>
                    <p className="text-xs text-slate-500 truncate">Organize & plan</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link
                  to="/calendar"
                  className={`nav-item flex items-center rounded-xl px-3 py-3 transition-all duration-300 ${
                    checkIfActive('/calendar') 
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 shadow-md' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                    checkIfActive('/calendar') 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md' 
                      : 'bg-slate-100'
                  }`}>
                    <Calendar className={`h-4 w-4 ${checkIfActive('/calendar') ? 'text-white' : 'text-slate-600'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm truncate block">Calendar</span>
                    <p className="text-xs text-slate-500 truncate">Schedule & events</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Status */}
        <div className="absolute bottom-4 left-4 right-4 space-y-3">
          <div className="bg-gradient-to-r from-white via-slate-50 to-white rounded-xl p-4 border border-slate-200/60 shadow-lg">
            <div className="flex justify-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-700 mb-1">Nagamanikanta Nallaganchu</p>
              <p className="text-xs text-slate-500">Creator</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="lg:ml-64 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;