import React, { useState } from 'react';
import { 
  FaQuestion, 
  FaBook, 
  FaUserGraduate, 
  FaCreditCard,
  FaLaptop,
  FaHeadset,
  FaSearch,
  FaChevronDown,
  FaEnvelope
} from 'react-icons/fa';
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
const Help = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const helpCategories = [
    { id: 'general', name: 'General', icon: <FaQuestion /> },
    { id: 'courses', name: 'Courses', icon: <FaBook /> },
    { id: 'account', name: 'Account', icon: <FaUserGraduate /> },
    { id: 'technical', name: 'Technical', icon: <FaLaptop /> },
    { id: 'payment', name: 'Payment', icon: <FaCreditCard /> },
  ];

  const faqs = {
    general: [
      {
        question: 'How do I get started with IgaThrive?',
        answer: 'Getting started is easy! Simply create an account, browse our course catalog, and enroll in your desired courses. Our system will guide you through the learning process step by step.'
      },
      {
        question: 'What makes IgaThrive different?',
        answer: 'We offer practical, hands-on courses with real-world applications, expert instructors, and flexible learning schedules. Our platform is designed to provide an engaging and effective learning experience.'
      }
    ],
    courses: [
      {
        question: 'How long do I have access to a course?',
        answer: 'Once enrolled, you have lifetime access to the course materials. You can learn at your own pace and revisit the content whenever you need to refresh your knowledge.'
      },
      {
        question: 'Are there any prerequisites for courses?',
        answer: 'Prerequisites vary by course. Each course page clearly lists any required background knowledge or skills. Many of our beginner courses have no prerequisites.'
      },
      {
        question: 'What is the course structure like?',
        answer: 'Courses typically include video lectures, reading materials, practical exercises, quizzes, and hands-on projects. You will also have access to discussion forums and instructor support.'
      }
    ],
    account: [
      {
        question: 'How do I reset my password?',
        answer: 'Click on the "Forgot Password" link on the login page. Enter your email address, and we will send you instructions to reset your password.'
      },
      {
        question: 'Can I change my email address?',
        answer: 'Yes, you can update your email address in your account settings. Make sure to verify your new email address after making the change.'
      }
    ],
    technical: [
      {
        question: 'What are the system requirements?',
        answer: 'You need a modern web browser (Chrome, Firefox, Safari, or Edge) and a stable internet connection. Some courses may have additional software requirements, which will be listed on the course page.'
      },
      {
        question: 'How can I troubleshoot video playback issues?',
        answer: 'Try clearing your browser cache, checking your internet connection, or switching to a different browser. If issues persist, contact our technical support team.'
      }
    ],
    payment: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.'
      },
      {
        question: 'Do you offer refunds?',
        answer: 'Yes, we offer a 30-day money-back guarantee for all courses. If you are not satisfied, contact our support team for a full refund.'
      }
    ]
  };

  const filteredFaqs = Object.entries(faqs[activeCategory]).filter(([_, faq]) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
    {/* Background Image with Overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('/images/help.jpeg')` }}
    >
      <div className="absolute inset-0 bg-black/65"></div>
    </div>

    {/* Main Content */}
    <div className="relative z-10">
       <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-500 mt-10 mb-5">
            HOW CAN WE HELP YOU?
          </h1>
          <p className="text-2xl text-gray-200 text-center mb-10">
            Empowering your journey in technology education
          </p>
          <div className="relative max-w-xl mx-auto">
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 rounded-lg shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Support Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-600 text-white p-6 rounded-xl shadow-lg flex items-center">
            <FaHeadset className="text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Need Immediate Help?</h3>
              <p className="mb-4">Our support team is available 24/7</p>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Contact Support
              </button>
            </div>
          </div>
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg flex items-center">
            <FaEnvelope className="text-4xl mr-4" />
            <div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="mb-4">Get detailed assistance via email</p>
              <button className="bg-white text-green-950 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Send Email
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {helpCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gray-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {filteredFaqs.map(([key, faq], index) => (
            <div
              key={key}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <FaChevronDown
                  className={`text-gray-500 transition-transform duration-300 ${
                    expandedFaq === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <p className="p-6 pt-0 text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Still Need Help Section */}
        <div className="mt-12 text-center bg-transparent p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl text-gray-300 font-semibold mb-4">Still Need Help?</h3>
          <p className="text-gray-200 mb-6">
            Can't find what you're looking for? Our support team is ready to assist you.
          </p>
          <button className="bg-white text-blue-950 px-8 py-3 rounded-lg hover:bg-blue-300 hover:text-gray-900 transition-colors duration-300">
            Contact Us
          </button>
        </div>
      </div>
      <Footer />
      </div>
    </div>
  );
};

export default Help;