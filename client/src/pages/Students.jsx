import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit, 
  ChevronRight,
  Award,
  BookOpen
} from 'lucide-react';
import { 
  Alert,
  AlertDescription,
  AlertTitle 
} from '@/components/ui/alert';
import Sidebar from '../components/Sidebar';
const Students = () => {
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: "Raissa Mpawenayo", 
      email: "raissampawenayogmail.com",
      progress: 100,
      enrolledCourses: ["Web Design and Development"],
      avatar: "images/woman.png",
      lastActive: "2024-10-16"
    },
    { 
      id: 2, 
      name: "Chancelline Niyotugendana", 
      email: "chancelineniyo@gmail.com",
      progress: 60,
      enrolledCourses: ["Computer Graphics", "E-Banking"],
      avatar: "images/woman.png",
      lastActive: "2024-03-14"
    },
    { 
      id: 3, 
      name: "Christopher Muneza", 
      email: "munezatopher@gmail.com",
      progress: 70,
      enrolledCourses: ["Computer Graphics"],
      avatar: "images/man.jpg",
      lastActive: "2024-03-14"
    },
    {
    id: 4, 
    name: "Prencia Bella Arakaza", 
    email: "jprenciaarakaza@gmail.com",
    progress: 80,
    enrolledCourses: ["Professional Skills"],
    avatar: "images/woman.png",
    lastActive: "2024-11-18"
  },
  { 
    id: 5, 
    name: "Joyeuse Nsabimana (Nana)", 
    email: "nanajoyeuse@gmail.com",
    progress: 70,
    enrolledCourses: ["E-Banking"],
    avatar: "images/woman.png",
    lastActive: "2024-11-16"
  }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
    setShowDeleteAlert(true);
    setTimeout(() => setShowDeleteAlert(false), 3000);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
    <Sidebar />
    <div className="p-6 space-y-6 animate-fadeIn w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold">Students Management</h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search students..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {showDeleteAlert && (
        <Alert className="bg-green-50 border-green-200 animate-slideIn">
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">
            Student has been successfully removed from the system.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-semibold text-lg">{student.name}</h3>
                  <p className="text-gray-600 text-sm">{student.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="font-medium">Progress: {student.progress}%</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium">
                    Courses: {student.enrolledCourses.length}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <Edit className="h-5 w-5 text-gray-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    <Trash2 className="h-5 w-5 text-red-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span>Enrolled Courses:</span>
                  {student.enrolledCourses.map((course, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                    >
                      {course}
                    </span>
                  ))}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Last Active: {student.lastActive}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
    </div>
  );
};

export default Students;