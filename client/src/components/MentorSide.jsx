import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ChevronLeft,
  Settings,
  Bell,
  LogOut,
  Menu, 
} from 'lucide-react';

const MentorSide = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/mentor-dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/unique-courses' },
    { icon: Users, label: 'Students', path: '/all-students' },
    { icon: Bell, label: 'Feedback', path: '/feedback' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 p-3 rounded-md"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-50 
          bg-slate-900 text-white 
          transition-transform duration-300 ease-in-out 
          max-h-dvh overflow-hidden
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:static md:translate-x-0
          ${isCollapsed ? 'w-20' : 'w-64'}
          md:flex md:flex-col
          min-h-screen flex-col
        `}
      >
        {/* Collapse Toggle Button */}
        <button
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            setIsMobileOpen(false);
          }}
          className="absolute -right-3 top-8 bg-blue-600 rounded-full p-1.5 
            hover:bg-blue-700 transition-colors duration-200 z-50 hidden md:block"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform duration-300 ${
              isCollapsed ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Close Button for Mobile */}
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden absolute top-4 right-4 bg-grey-900 p-4 rounded-md"
        >
          <ChevronLeft className="h-6 w-6 text-white rotate-180" />
        </button>

        {/* Profile Section */}
        <div className="p-4 border-b border-slate-700">
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-4'}`}
          >
            <div className="relative ">
              <img
                src="/images/loue.jpg"
                alt="Mentor"
                className={`rounded-full border-2 border-blue-500 transition-transform duration-200 hover:scale-105 ${isCollapsed ? 'w-8 h-8' : 'w-12 h-12'}`}
              />
              <div
                className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 
                rounded-full border-2 border-slate-900"
              ></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-bold truncate">Loue Christian</h2>
                <p className="text-sm text-slate-400 truncate">Mentor</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto">
          <div className="px-3 mb-4">
            <div
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-2 px-2`}
            >
              {!isCollapsed && (
                <span className="text-sm font-semibold text-slate-400">Menu</span>
              )}
              {!isCollapsed && (
                <div className="flex space-x-1">
                  <Bell className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                  <Settings className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                } ${isCollapsed ? 'justify-center' : 'space-x-3'} group relative`}
              >
                <item.icon
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isActive(item.path) ? 'text-white' : 'text-slate-400'
                  } group-hover:scale-110`}
                />
                {!isCollapsed && <span>{item.label}</span>}
                {isCollapsed && (
                  <div
                    className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white 
                    rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-200 text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Section */}
        <div className="border-t border-slate-700 p-3">
          <Link
            to="/"
            className={`flex items-center px-3 py-3 rounded-lg text-red-400 
              hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 ${
                isCollapsed ? 'justify-center' : 'space-x-3'
              } group relative`}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>Logout</span>}
            {isCollapsed && (
              <div
                className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white 
                rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                transition-all duration-200 text-sm whitespace-nowrap"
              >
                Logout
              </div>
            )}
          </Link>
        </div>
      </div>
    </>
  );
};

export default MentorSide;
