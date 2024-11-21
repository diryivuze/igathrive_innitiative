import React from 'react'; 
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const team = [
    {
      name: 'Mr. Loue Sauveur Christian',
      role: 'Web Design & Development Instructor',
      message: 'Driven by passion for innovation and excellence.',
      social: { linkedin: '#', instagram: '#', gmail: '' },
      image: '/images/loue.jpg'
    },
    {
      name: 'Mr. Michael Alain Muhirwa',
      role: 'Computer Components & Troubleshooting Instructor',
      message: 'Committed to crafting seamless and efficient solutions.',
      social: { linkedin: '#', instagram: '#', gmail: '' },
      image: '/images/man.jpg'
    },
    {
      name: 'Mr. David Niyonshuti',
      role: 'Computer Graphics Instructor',
      message: 'Driven by passion for innovation and excellence.',
      social: { linkedin: '#', instagram: '#', gmail: '' },
      image: '/images/david2.jpg'
    },
    {
      name: 'Mr. Daniel Iryivuze',
      role: 'MS Office & G Suite Usage Instructor',
      message: 'Committed to crafting seamless and efficient solutions.',
      social: { linkedin: '#', instagram: '#', gmail: '' },
      image: '/images/founder.jpg'
    },
    {
      name: 'Miss. Vanessa Uwonkunda',
      role: 'E-Banking Instructor',
      message: 'Driven by passion for innovation and excellence.',
      social: { linkedin: '#', instagram: '#', gmail: '' },
      image: '/images/vanessa1.jpg'
    },
    {
      name: 'Miss. Sonia Ikirezi Hirwa',
      role: 'Professional Skills Instructor',
      message: 'Inspired by the power of intuitive and user-centric design.',
      social: { linkedin: '#', instagram: '#', gmail: '' },
      image: '/images/woman.png'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/images/about.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <motion.div
          className="container mx-auto px-4 py-14"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-4xl font-bold text-center text-blue-500 mt-10 mb-5"
            variants={itemVariants}
          >
            ABOUT US
          </motion.h1>
          <p className="text-2xl text-gray-200 text-center mb-10">
            Empowering your journey in technology education
          </p>
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <motion.section variants={itemVariants} className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-semibold mb-4 text-blue-950">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to empower individuals through comprehensive, accessible courses that enhance both professional and personal skills.
                </p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-3xl font-semibold mb-4 text-blue-950">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our vision is to become a leader in online education by delivering high-quality, user-friendly, and accessible resources.
                </p>
              </div>
            </motion.section>
          </div>

          <motion.section variants={itemVariants} className="mb-16">
            <h2 className="text-4xl font-semibold mb-12 text-center text-blue-100">Meet Our Instructors</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  whileHover={{ scale: 1.02 }}
                  variants={itemVariants}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-center text-blue-800">{member.name}</h3>
                  <p className="text-blue-600 text-center mb-4">{member.role}</p>
                  <p className="text-gray-700 mb-6 text-center italic">&quot;{member.message}&quot;</p>
                  <div className="flex justify-center space-x-4">
                    <a href={member.social.linkedin} className="text-gray-600 hover:text-blue-950 transition-colors">
                      <FaLinkedin className="text-2xl" />
                    </a>
                    <a href={member.social.instagram} className="text-gray-600 hover:text-blue-950 transition-colors">
                      <FaInstagram className="text-2xl" />
                    </a>
                    <a href={member.social.gmail} className="text-gray-600 hover:text-blue-950 transition-colors">
                      <FaEnvelope className="text-2xl" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            variants={itemVariants}
            className="text-white px-4 md:px-12 py-12 rounded-md shadow-lg text-center"
          >
            <h2 className="text-3xl font-semibold mb-6">Join Our Journey</h2>
            <p className="text-lg mb-8">
              Be part of our mission to transform online education and empower learners worldwide.
            </p>
            <motion.button
              onClick={() => navigate('/register')}
              className="bg-white text-blue-950 px-8 py-3 rounded-full font-medium hover:bg-blue-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </motion.section>
        </motion.div>
        <Footer />
      </div>
    </div>
  );
};

export default About;
