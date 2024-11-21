import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Download, 
  Search,
  Calendar,
  Clock,
  Menu
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import StudentSide from '../components/StudentSide';

const completedCourses = [
  {
    id: 1,
    name: 'M.S. Office and G Suite Usage',
    completionDate: '2024-11-15',
    duration: '30 hours',
    score: 92,
    certificate: 'CERT001'
  },
  // {
  //   id: 2,
  //   name: 'Professional Skills',
  //   completionDate: '2024-11-18',
  //   duration: '25 hours',
  //   score: 88,
  //   certificate: 'CERT002'
  // },
  {
    id: 3,
    name: 'Business Communication',
    completionDate: '2024-11-16',
    duration: '20 hours',
    score: 95,
    certificate: 'CERT003'
  }
];

const Completed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
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

  const filteredCourses = completedCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Sidebar Toggle Button for Mobile */}
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
        flex-1 p-6 mt-8 sm:p-6 lg:p-8 
        transition-all duration-300 
        ${isSidebarOpen && windowWidth < 768 ? 'opacity-50' : 'opacity-100'}
      `}>
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Completed Courses
            </h1>
            <div className="w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="w-4 h-4 text-gray-900" />}
              />
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                      <Badge variant="secondary" className="text-xs sm:text-sm">
                        Score: {course.score}%
                      </Badge>
                    </div>
                    
                    <h2 className="text-lg sm:text-xl font-semibold mb-4 line-clamp-2">
                      {course.name}
                    </h2>
                    
                    <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-6">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          Completed: {new Date(course.completionDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">Duration: {course.duration}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-2">
                      <span className="text-green-600 font-medium text-sm sm:text-base">
                        Successfully Completed!
                      </span>
                      <button 
                        onClick={() => window.open(`/certificates/${course.certificate}.pdf`)}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base"
                      >
                        <Download className="w-4 h-4" />
                        Certificate
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <Award className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-medium text-gray-600">
                {searchTerm ? 'No matching courses found' : 'No completed courses yet'}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mt-2">
                {searchTerm ? 'Try adjusting your search terms' : 'Complete your first course to see it here'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && windowWidth < 768 && (
        <div 
          className="fixed p-4 inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Completed;