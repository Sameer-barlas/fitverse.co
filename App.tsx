import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import WorkoutPlanPage from './pages/WorkoutPlanPage';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';
import { User } from './types';
import { getCurrentUser, logoutUser } from './services/storage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} user={user} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'signup':
        return <Signup onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'dashboard':
        return user ? <Dashboard user={user} onNavigate={setCurrentPage} /> : <Home onNavigate={setCurrentPage} user={null} />;
      case 'workout':
        return user ? <WorkoutPlanPage user={user} /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'profile':
        return user ? <Profile user={user} onUpdate={(u) => setUser(u)} /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'admin':
        return user?.isAdmin ? <Admin /> : <Dashboard user={user!} onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 text-gray-800 font-sans selection:bg-emerald-200 relative">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={setCurrentPage}
        currentPage={currentPage} 
      />
      <main className="container mx-auto px-4 py-8 fade-in">
        {renderPage()}
      </main>
      
      {/* AI Chatbot Widget */}
      <Chatbot />

      <footer className="bg-emerald-900 text-emerald-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold text-xl mb-2">FitVerse</p>
          <p className="text-sm opacity-70">© 2024 University Software Engineering Project</p>
          <div className="mt-4 flex justify-center space-x-4 text-xs opacity-50">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Contact Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;