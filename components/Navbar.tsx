import React from 'react';
import { User } from '../types';
import { LogOut, User as UserIcon, Activity, LayoutDashboard, Menu, X } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const NavItem = ({ page, label, icon: Icon }: any) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        currentPage === page 
          ? 'bg-emerald-600 text-white shadow-lg' 
          : 'text-emerald-900 hover:bg-emerald-100'
      }`}
    >
      {Icon && <Icon size={18} />}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
            <Activity className="text-emerald-600" size={32} />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              FitVerse
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <NavItem page="home" label="Home" />
            {user ? (
              <>
                <NavItem page="dashboard" label="Dashboard" icon={LayoutDashboard} />
                <NavItem page="workout" label="My Plan" icon={Activity} />
                <NavItem page="profile" label="Profile" icon={UserIcon} />
                {user.isAdmin && <NavItem page="admin" label="Admin" />}
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium ml-4"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavItem page="login" label="Login" />
                <button
                  onClick={() => onNavigate('signup')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-bold shadow-md transition-transform hover:scale-105"
                >
                  Sign Up Free
                </button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-emerald-800">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-emerald-100 p-4 space-y-2 animate-fade-in">
          <NavItem page="home" label="Home" />
          {user ? (
            <>
              <NavItem page="dashboard" label="Dashboard" icon={LayoutDashboard} />
              <NavItem page="workout" label="My Plan" icon={Activity} />
              <NavItem page="profile" label="Profile" icon={UserIcon} />
              {user.isAdmin && <NavItem page="admin" label="Admin" />}
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavItem page="login" label="Login" />
              <button
                onClick={() => {
                    onNavigate('signup');
                    setIsOpen(false);
                }}
                className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold mt-2"
              >
                Sign Up Free
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;