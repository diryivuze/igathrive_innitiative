import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Users,
  Calendar,
  FileText,
  Settings,
  Edit3,
  Save,
  X,
  Plus,
  ChevronRight,
  Download,
  Upload
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Sidebar from '../components/Sidebar'; 

const initialCourses = [
  {
    id: 1,
    title: "Computer Graphics",
    description: "Learn modern computer graphics principles and techniques",
    enrolled: 15,
    duration: "12 weeks",
    lastModified: "2024-11-18",
    modifiedBy: "Mr. David Niyonshuti",
    status: "active",
    progress: 10,
    resources: 12,
    assignments: 8
  },
  {
    id: 2,
    title: "Computer Components and Troubleshooting",
    description: "Master hardware components and PC troubleshooting",
    enrolled: 19,
    duration: "8 weeks",
    lastModified: "2024-11-15",
    modifiedBy: "Mr. Michael Alain Muhirwa",
    status: "active",
    progress: 10,
    resources: 15,
    assignments: 6
  },
  {
    id: 3,
    title: "M.S. Office and G Suite Usage",
    description: "Comprehensive training on Microsoft Office and Google Workspace",
    enrolled: 10,
    duration: "6 weeks",
    lastModified: "2024-11-19",
    modifiedBy: "Mr. Daniel Iryivuze",
    status: "active",
    progress: 9,
    resources: 20,
    assignments: 8
  },
  {
    id: 4,
    title: "Web Design and Development",
    description: "Create modern and responsive websites",
    enrolled: 20,
    duration: "12 weeks",
    lastModified: "2024-11-13",
    modifiedBy: "Mr. Loue Sauveur Christian",
    status: "active",
    progress: 17,
    resources: 25,
    assignments: 4
  },
  {
    id: 5,
    title: "E-Banking Instructor",
    description: "Navigate the digital world safely and effectively",
    enrolled: 25,
    duration: "4 weeks",
    lastModified: "2024-11-04",
    modifiedBy: "Miss. Vanessa Uwonkunda",
    status: "active",
    progress: 23,
    resources: 7,
    assignments: 3
  },
  {
    id: 6,
    title: "Professional Skills",
    description: "Master digital design and image manipulation techniques",
    enrolled: 20,
    duration: "6 weeks",
    lastModified: "2024-11-19",
    modifiedBy: "Miss. Sonia Ikirezi Hirwa",
    status: "active",
    progress: 18,
    resources: 15,
    assignments: 8
  }
];

const Courses = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleModify = (course) => {
    setSelectedCourse(course);
    setIsEditing(true);
  };

  const handleSave = () => {
    setCourses(courses.map(c => 
      c.id === selectedCourse.id ? selectedCourse : c
    ));
    setAlertMessage("Course updated successfully!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setIsEditing(false);
  };

  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4">
        <div className={`px-3 py-1 rounded-full text-sm ${
          course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
        </div>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
          <p className="text-gray-600 mb-4">{course.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{course.enrolled} Students</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FileText className="w-4 h-4 mr-2" />
              <span>{course.resources} Resources</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{course.assignments} Assignments</span>
            </div>
          </div>

          <div className="h-2 bg-gray-200 rounded-full mb-4">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            />
          </div>

          <div className="text-sm text-gray-500">
            Last modified by {course.modifiedBy} on {course.lastModified}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          onClick={() => handleModify(course)}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <Edit3 className="w-4 h-4 mr-2" />
          Modify
        </button>
        <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const EditPanel = () => (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto"
         style={{ transform: isEditing ? 'translateX(0)' : 'translateX(100%)' }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Course</h2>
        <button 
          onClick={() => setIsEditing(false)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {selectedCourse && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title
            </label>
            <input
              type="text"
              value={selectedCourse.title}
              onChange={(e) => setSelectedCourse({...selectedCourse, title: e.target.value})}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={selectedCourse.description}
              onChange={(e) => setSelectedCourse({...selectedCourse, description: e.target.value})}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="4"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                value={selectedCourse.duration}
                onChange={(e) => setSelectedCourse({...selectedCourse, duration: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={selectedCourse.status}
                onChange={(e) => setSelectedCourse({...selectedCourse, status: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
      {showAlert && (
        <Alert className="fixed top-4 right-4 w-96 bg-green-50 border-green-200 animate-slideIn">
          <AlertDescription className="text-green-800">
            {alertMessage}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold">Course Management</h1>
        </div>

        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 animate-fadeIn">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      <EditPanel />

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
    </div>
  );
};

export default Courses;