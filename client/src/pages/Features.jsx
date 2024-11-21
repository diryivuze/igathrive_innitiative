import React, { useState } from 'react';
import { 
  FaBook, 
  FaChalkboardTeacher, 
  FaLaptopCode, 
  FaClock, 
  FaGraduationCap,
  FaUserCog,
  FaCode,
  FaDesktop,
  FaFileAlt,
  FaMobileAlt
} from 'react-icons/fa';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
const Features = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  const navigate = useNavigate();
  const courses = [
    {
      icon: <FaDesktop className="text-4xl text-blue-600" />,
      title: 'Computer Graphics',
      description: 'Master digital design and image manipulation techniques',
      duration: '8 weeks',
      skills: ['Adobe Creative Suite', 'Digital Design', 'Image Editing'],
    },
    {
      icon: <FaMobileAlt className="text-4xl text-green-600" />,
      title: 'E-Banking',
      description: 'Navigate the digital world safely and effectively',
      duration: '4 weeks',
      skills: ['Online Safety', 'Digital Literacy', 'Web Navigation'],
    },
    {
      icon: <FaUserCog className="text-4xl text-purple-600" />,
      title: 'Computer Components and Troubleshooting',
      description: 'Learn hardware basics and problem-solving techniques',
      duration: '6 weeks',
      skills: ['Hardware Knowledge', 'Problem Diagnosis', 'System Maintenance'],
    },
    {
      icon: <FaFileAlt className="text-4xl text-red-600" />,
      title: 'M.S. Office and G Suite Usage',
      description: 'Master essential productivity tools',
      duration: '6 weeks',
      skills: ['Document Processing', 'Spreadsheets', 'Presentations'],
    },
    {
      icon: <FaCode className="text-4xl text-yellow-600" />,
      title: 'Web Design and Development',
      description: 'Create modern and responsive websites',
      duration: '12 weeks',
      skills: ['HTML/CSS', 'JavaScript', 'Responsive Design'],
    },
    {
      icon: <FaDesktop className="text-4xl text-blue-600" />,
      title: 'Professional Skills',
      description: 'Master digital design and image manipulation techniques',
      duration: '6 weeks',
      skills: ['Problem solving', 'Time management', 'Creativity','Teamwork','Communication','Leadership','Adaptability'],
    }
  ];

  const mainFeatures = [
    {
      icon: <FaBook className="text-4xl text-blue-600" />,
      title: 'Flexible Learning',
      description: 'Study at your own pace with our comprehensive course materials',
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl text-green-600" />,
      title: 'Expert Guidance',
      description: 'Learn from industry professionals with years of experience',
    },
    {
      icon: <FaLaptopCode className="text-4xl text-purple-600" />,
      title: 'Hands-on Practice',
      description: 'Apply your knowledge through practical projects and assignments',
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
    {/* Background Image with Overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('/images/experience.jpeg')` }}
    >
      <div className="absolute inset-0 bg-black/65"></div>
    </div>

    {/* Main Content */}
    <div className="relative z-10">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-500 mt-10 mb-5">
            DISCOVER OUR FEATURES
          </h1>
          <p className="text-2xl text-gray-200">
            Empowering your journey in technology education
          </p>
        </div>

        {/* Main Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Courses Section */}
        <h2 className="text-3xl font-bold text-gray-200 mb-8 text-center">
          Our Course Offerings
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className="flex items-center mb-4">
                {course.icon}
                <h3 className="text-xl font-semibold ml-4 text-gray-800">
                  {course.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                activeFeature === index ? 'max-h-48' : 'max-h-0'
              }`}>
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center mb-2">
                    <FaClock className="text-gray-500 mr-2" />
                    <span className="text-gray-700">Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaGraduationCap className="text-gray-500 mr-2" />
                    <span className="text-gray-700">Skills you'll gain:</span>
                  </div>
                  <ul className="ml-8 list-disc text-gray-600">
                    {course.skills.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button onClick={() => navigate('/register')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      </div>
    </div>
  );
};

export default Features;