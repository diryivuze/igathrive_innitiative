import React, { useState } from 'react';
import StudentSide from '../components/StudentSide';
import { 
  Monitor, 
  Cpu, 
  DollarSign,
  FileSpreadsheet, 
  Globe, 
  Briefcase,
  Menu,
  X,
  Clock,
  Users,
  Calendar,
} from 'lucide-react';

const courses = [
  {
    id: 1,
    name: 'Computer Graphics',
    icon: <Monitor className="w-6 h-6" />,
    description: 'Learn about 2D/3D graphics, visualization, and animation techniques.',
    duration: '4 months',
    students: '4+',
    startDate: 'Flexible',
    instructor: 'Mr. David Niyonshuti',
    skills: ['2D/3D Design', 'Animation', 'Rendering', 'CAD']
  },
  {
    id: 2,
    name: 'Computer Components and Troubleshooting',
    icon: <Cpu className="w-6 h-6" />,
    description: 'Master hardware components and learn professional troubleshooting.',
    duration: '3 months',
    students: '8+',
    startDate: 'Immediate',
    instructor: 'Mr. Michael Alain Muhirwa',
    skills: ['Hardware', 'Diagnostics', 'Maintenance', 'Repair']
  },
  {
    id: 3,
    name: 'E-Banking',
    icon: < DollarSign className="w-6 h-6" />,
    description: 'Explore digital banking systems, security, and financial technology.',
    duration: '2 months',
    students: '6+',
    startDate: 'Next Week',
    instructor: 'Miss. Vanessa Uwonkunda',
    skills: ['Digital Banking', 'Security', 'Transactions', 'FinTech']
  },
  {
    id: 4,
    name: 'M.S. Office and G Suite Usage',
    icon: <FileSpreadsheet className="w-6 h-6" />,
    description: 'Master essential productivity tools for professional work.',
    duration: '2 months',
    students: '2+',
    startDate: 'Flexible',
    instructor: 'Mr. Daniel Iryivuze',
    skills: ['Office Suite', 'Documentation', 'Spreadsheets', 'Presentations']
  },
  {
    id: 5,
    name: 'Web Design and Development',
    icon: <Globe className="w-6 h-6" />,
    description: 'Create modern, responsive websites using latest technologies.',
    duration: '6 months',
    students: '5+',
    startDate: 'Monthly',
    instructor: 'Mr. Loue Sauveur Christian',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Responsive Design']
  },
  {
    id: 6,
    name: 'Professional Skills',
    icon: <Briefcase className="w-6 h-6" />,
    description: 'Develop essential workplace and communication skills.',
    duration: '3 months',
    students: '3+',
    startDate: 'Continuous',
    instructor: 'Miss. Sonia Ikirezi Hirwa',
    skills: ['Communication', 'Leadership', 'Time Management', 'Teamwork']
  }
];

const NewCourses = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEnroll = (courseId) => {
    // Handle enrollment logic here
    console.log(`Enrolled in course: ${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="lg:pl-64 min-h-screen">
        {/* Top Navigation */}
        <nav className="bg-white shadow-sm px-4 py-2 sm:px-6 sm:py-4">
          <div className="flex items-center">
            <button 
              onClick={() => setShowMobileSidebar(true)}
              className="p-2 mr-4 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">New Courses</h1>
          </div>
        </nav>

        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">{course.name}</h2>
                      <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{course.students}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{course.startDate}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Skills you'll gain:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end">
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCourses;