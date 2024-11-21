import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    newsletter: false
  });

  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('success');
    setTimeout(() => setSubmitStatus(''), 3000);
  };

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

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone",
      content: "+250 780 162 164",
      link: "tel:+250780162164"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      content: "info@igathrive.com",
      link: "mailto:info@igathrive.com"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Address",
      content: "123 Main St, Kigali, Rwanda",
      link: "https://maps.app.goo.gl/t1FfUdnqPb7ZbR5P7"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Business Hours",
      content: "Mon - Fri: 9:00 AM - 6:00 PM",
      link: null
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
    {/* Background Image with Overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('/images/contact..jpg')` }}
    >
      <div className="absolute inset-0 bg-black/65"></div>
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
          GET IN TOUCH
        </motion.h1>
        <p className="text-2xl text-gray-200 text-center mb-10">
            Empowering your journey in technology education
          </p>
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-semibold mb-8 text-blue-950">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4"
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-3 bg-blue-100 rounded-full text-blue-950">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-blue-950 hover:text-blue-800 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="p-3 bg-blue-100 rounded-full text-blue-950 hover:bg-blue-200 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-semibold mb-8 text-blue-950">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-gray-700">Subscribe to our newsletter</label>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-3 bg-blue-950 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-center mt-4"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div 
      variants={itemVariants}
      className="w-full h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="w-full h-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!4v1731399902673!6m8!1m7!1sGF6mZ8VOLWuZmqdTeFk8yA!2m2!1d-1.95135496012824!2d30.06025112426089!3f306.12067146795846!4f-10.394140610927153!5f0.7820865974627469" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        />
      </div>
    </motion.div>
      </motion.div>
      <Footer />
    </div>
    </div>
  );
};

export default Contact;