import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  Award,
  Menu,
  BarChart,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import StudentSide from '../components/StudentSide';

const enrolledCourses = [
  // { 
  //   id: 1,
  //   name: 'Computer Graphics',
  //   progress: 75,
  //   totalModules: 12,
  //   completedModules: 9,
  //   lastAccessed: '2024-11-19',
  //   estimatedCompletion: '2024-12-01',
  //   timeSpent: '45 hours'
  // },
  { 
    id: 2,
    name: 'E-Banking',
    progress: 50,
    totalModules: 8,
    completedModules: 4,
    lastAccessed: '2024-11-16',
    estimatedCompletion: '2024-12-20',
    timeSpent: '30 hours'
  },
  { 
    id: 3,
    name: 'M.S. Office and G Suite Usage',
    progress: 100,
    totalModules: 15,
    completedModules: 15,
    lastAccessed: '2024-11-16',
    estimatedCompletion: '2024-11-17',
    timeSpent: '30 hours'
  },
  // { 
  //   id: 4,
  //   name: 'Professional Skills',
  //   progress: 100,
  //   totalModules: 18,
  //   completedModules: 18,
  //   lastAccessed: '2024-11-18',
  //   estimatedCompletion: '2024-11-20',
  //   timeSpent: '25 hours'
  // },
  { 
    id: 5,
    name: 'Business Communication',
    progress: 100,
    totalModules: 12,
    completedModules: 12,
    lastAccessed: '2024-11-16',
    estimatedCompletion: '2024-11-18',
    timeSpent: '20 hours'
  },
];

const Progress = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Sidebar Toggle */}
      {!isSidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-full shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Responsive Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        fixed md:relative z-40
        md:translate-x-0
      `}>
        <StudentSide onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className={`
        flex-1 p-4 mt-10 sm:p-6 lg:p-8
        transition-all duration-300
        ${isSidebarOpen && windowWidth < 768 ? 'opacity-50' : 'opacity-100'}
      `}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Course Progress</h1>
            <p className="text-gray-600">Track your learning journey and course completion</p>
          </div>

          {/* Course Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card 
                key={course.id}
                className={`hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                  selectedCourse === course.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="font-semibold text-lg mb-1 line-clamp-2">{course.name}</h2>
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="w-4 h-4 mr-1" />
                        <span>{course.completedModules}/{course.totalModules} Modules</span>
                      </div>
                    </div>
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold
                      ${getProgressColor(course.progress)}
                    `}>
                      {course.progress}%
                    </div>
                  </div>

                  <div className="mb-4">
                    <ProgressBar 
                      value={course.progress} 
                      className="h-2"
                    />
                  </div>

                  {/* Expanded Details */}
                  <div className={`
                    space-y-3 text-sm
                    transition-all duration-300
                    ${selectedCourse === course.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}
                  `}>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      Time Spent: {course.timeSpent}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last Accessed: {new Date(course.lastAccessed).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Award className="w-4 h-4 mr-2" />
                      Est. Completion: {new Date(course.estimatedCompletion).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Course Status */}
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {course.progress === 100 ? 'Completed' : 'In Progress'}
                    </span>
                    <button 
                      className="text-blue-500 hover:text-blue-600 font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.location.href = `/course/${course.id}`;
                      }}
                    >
                      Continue Learning
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Progress Summary */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4">
                  <BarChart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)}%
                  </div>
                  <div className="text-gray-600 text-sm">Average Progress</div>
                </div>
                <div className="text-center p-4">
                  <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {enrolledCourses.reduce((acc, course) => acc + course.completedModules, 0)}
                  </div>
                  <div className="text-gray-600 text-sm">Modules Completed</div>
                </div>
                <div className="text-center p-4">
                  <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {enrolledCourses.reduce((acc, course) => acc + parseInt(course.timeSpent), 0)}h
                  </div>
                  <div className="text-gray-600 text-sm">Total Time Spent</div>
                </div>
                <div className="text-center p-4">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">
                    {enrolledCourses.filter(course => course.progress === 100).length}
                  </div>
                  <div className="text-gray-600 text-sm">Courses Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && windowWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Progress;