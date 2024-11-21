import  { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { 
  BookOpen, 
  DollarSign,
  FileSpreadsheet,  
  Briefcase,
  Bell,
  User,
  Calendar,
  BarChart3,
  Clock,
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import StudentSide from '../components/StudentSide';

const performanceData = [
  { month: 'Sept', progress: 5 },
  { month: 'Oct', progress: 15 },
  { month: 'Nov', progress: 32 },
];

const courses = [
  { 
    id: 1, 
    name: 'E-Banking', 
    icon: <DollarSign className="w-6 h-6" />,
    progress: 50,
    nextClass: '10:00 AM Tomorrow',
    assignments: 10
  },
  { 
    id: 2, 
    name: 'M.S. Office and G Suite Usage', 
    icon: <FileSpreadsheet className="w-6 h-6" />,
    progress: 100,
    nextClass: 'Completed',
    assignments: 0
  },
  { 
    id: 3, 
    name: 'Business Communication', 
    icon: <Briefcase className="w-6 h-6" />,
    progress: 100,
    nextClass: 'Completed',
    assignments: 0
  }
];

const StudentDash = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-3">
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden ${showMobileSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
           onClick={() => setShowMobileSidebar(false)}>
        <div className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full'}`}
             onClick={e => e.stopPropagation()}>
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">Menu</h2>
            <button onClick={() => setShowMobileSidebar(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <StudentSide />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64 border-r bg-white">
        <StudentSide />
      </div>

      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm px-4 sm:px-6 py-2 sm:py-4 sticky top-0 z-30">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowMobileSidebar(true)}
                className="p-2 lg:hidden"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">Student Portal</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1 sm:p-2 hover:bg-gray-100 rounded-full"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                <span className="absolute top-0 right-0 h-3 w-3 sm:h-4 sm:w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome back, Christophe!</h2>
            <p className="text-sm sm:text-base text-gray-600">Track your progress and stay up to date with your courses.</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Stats cards with responsive text and padding */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center space-x-3 mb-2">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <h3 className="font-semibold text-sm sm:text-base text-gray-800">Overall Progress</h3>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">78%</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold text-gray-800">Completed Tasks</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">31/41</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Clock className="w-6 h-6 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Study Hours</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">80h</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Calendar className="w-6 h-6 text-orange-600" />
              <h3 className="font-semibold text-gray-800">Active Courses</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">1</p>
          </div>
          </div>

          {/* Performance Graph */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Performance Overview</h3>
            <div className="h-60 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#4F46E5" 
                    strokeWidth={2}
                    dot={{ strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses.map(course => (
              <div 
                key={course.id} 
                className="bg-white rounded-lg shadow-sm p-4 sm:p-6 transform transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center space-x-3 mb-4">
                  {course.icon}
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-2">{course.name}</h3>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">Next Class: {course.nextClass}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 flex-shrink-0" />
                    <span>{course.assignments} Pending Assignments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications Panel - Made responsive */}
      {showNotifications && (
        <div className="fixed top-14 sm:top-16 right-2 sm:right-4 w-[calc(100%-1rem)] sm:w-80 max-w-sm bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50">
          <h4 className="font-semibold text-gray-800 mb-3">Notifications</h4>
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {/* Notification items with responsive adjustments */}
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="p-1 bg-blue-100 rounded flex-shrink-0">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-800 line-clamp-2">New assignment posted in Web Development</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="p-1 bg-green-100 rounded">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            <div>
                <p className="text-sm text-gray-800">You completed Professional Skills quiz</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded">
              <div className="p-1 bg-purple-100 rounded">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-800">Upcoming class: Computer Graphics</p>
                <p className="text-xs text-gray-500">Tomorrow at 10:00 AM</p>
              </div>
              </div>
              </div>
              </div>
      )}
    </div>
  );
};

export default StudentDash;