import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext.jsx';
import { ProjectProvider } from './context/ProjectContext.jsx';
import Layout from './components/layout/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TasksPage from './pages/TasksPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import CalendarPage from './pages/CalendarPage.jsx';

function App() {
  return (
    <Router>
      <TaskProvider>
        <ProjectProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </TaskProvider>
    </Router>
  );
}

export default App;