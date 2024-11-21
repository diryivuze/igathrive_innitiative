import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaUserCircle } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Navigate, useNavigate } from 'react-router-dom';

const Experience = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const testimonials = [
    {
      name: 'Igiraneza Sheilla',
      role: 'Product Manager',
      company: 'SheCan Africa',
      course: 'Computer Graphics',
      image: '/images/woman.png',
      rating: 5,
      feedback: 'IgaThrive helped me acquire essential skills for my career. The Computer Graphics course was comprehensive and practical.',
      category: 'professional'
    },
    {
      name: 'Jean Paul Bukuru',
      role: 'Digital Marketing Manager',
      company: 'Marketing Solutions',
      course: 'Professional Skills',
      image: '/images/man.jpg',
      rating: 5,
      feedback: 'The Professional Skills course transformed my approach to team management. The platform is intuitive and the content is top-notch!',
      category: 'professional'
    },
    {
      name: 'Raissa Mpawenayo',
      role: 'Student',
      company: 'African Leadership University',
      course: 'Web Design and Development',
      image: '/images/woman.png',
      rating: 4,
      feedback: 'As a student, the web development course gave me practical skills that I could immediately apply to real projects.',
      category: 'student'
    },
    {
      name: 'Nise Jabo Ghislain',
      role: 'Project Manager',
      company: '1:55 AM',
      course: 'Computer Graphics',
      image: '/images/man.jpg',
      rating: 5,
      feedback: 'IgaThrive helped me acquire essential skills for my career. The Computer Graphics course was comprehensive and practical.',
      category: 'professional'
    },
    {
      name: 'Elvine Mugishawimana',
      role: 'Bank Officer',
      company: 'Global Bank',
      course: 'E-Banking',
      image: '/images/woman.png',
      rating: 5,
      feedback: 'The E-Banking course was exactly what I needed to understand modern banking systems. Excellent content and support!',
      category: 'professional'
    },
    {
    name: 'Chancelline Niyotugendana',
      role: 'Professional intern',
      company: 'Flatpictures',
      course: 'Computer Graphics',
      image: '/images/woman.png',
      rating: 5,
      feedback: 'IgaThrive helped me acquire essential skills for my career. The Computer Graphics course was comprehensive and practical.',
      category: 'student'
    },
    {
      name: 'Prencia Bella Arakaza',
      role: 'Digital Marketing Manager intern',
      company: 'Bank of Kigali (Gisenyi Branch)',
      course: 'Professional Skills',
      image: '/images/woman.png',
      rating: 5,
      feedback: 'The Professional Skills course transformed my approach to team management. The platform is intuitive and the content is top-notch!',
      category: 'student'
    },
    {
      name: 'Joyeuse Nsabimana (Nana)',
      role: 'Student',
      company: 'African Leadership University',
      course: 'Web Design and Development',
      image: '/images/woman.png',
      rating: 4,
      feedback: 'As a student, the web development course gave me practical skills that I could immediately apply to real projects.',
      category: 'student'
    }
  ];
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const filteredTestimonials = selectedCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  const stats = [
    { label: 'Happy Students', value: '10+' },
    { label: 'Course Completion Rate', value: '94%' },
    { label: 'Average Rating', value: '4.8/5' },
    { label: 'Career Transitions', value: '2+' }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
    {/* Background Image with Overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('/images/experience.png')` }}
    >
      <div className="absolute inset-0 bg-black/65"></div>
    </div>

    {/* Main Content */}
    <div className="relative z-10">
      <Navbar />
      
      <motion.div 
        className="container mx-auto px-4 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl font-bold text-center text-blue-500 mt-10 mb-5"
          variants={itemVariants}
        >
          SUCCESS STORIES
        </motion.h1>
        <p className="text-2xl text-gray-200 text-center mb-10">
            Empowering your journey in technology education
          </p>
        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={itemVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-3xl font-bold text-blue-950 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex justify-center space-x-4 mb-12"
          variants={itemVariants}
        >
          {['all', 'professional', 'student'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category 
                  ? 'bg-blue-950 text-white' 
                  : 'bg-white text-blue-950 hover:bg-blue-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {filteredTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start mb-6">
                <FaQuoteLeft className="text-3xl text-blue-950 opacity-20" />
              </div>
              
              <p className="text-gray-700 mb-6 text-lg italic">"{testimonial.feedback}"</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-blue-950">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{testimonial.course}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 text-center bg-inherit text-white p-12 rounded-md shadow-lg"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8">Join thousands of successful learners and transform your career</p>
          <motion.button
          onClick={() => navigate('/register')}
                 className="bg-white text-blue-950 px-8 py-3 rounded-full font-medium hover:bg-blue-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer />
</div>
    </div>
  );
};

export default Experience;