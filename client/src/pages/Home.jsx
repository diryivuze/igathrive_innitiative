import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  ChevronRight,
  BookOpen,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Calendar,
  ArrowDown,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import IgaThriveLoader from "../components/Loader"; 
const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // loading state
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const slides = [
    {
      title: "Learn Professional IT Skills",
      description: "Transform your career with industry-relevant courses",
      image:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/7_Top_Technical_Skills_to_Master_in_2021.jpg",
    },
    {
      title: "Expert-Led Training",
      description:
        "Learn from industry professionals with real-world experience",
      image:
        "https://img.freepik.com/premium-photo/children-e-learning-tablet-with-writing-wave-hello-book-education-development-study-desk-kids-touchscreen-notebook-with-smile-online-course-home-school-family-house_590464-303532.jpg",
    },
    {
      title: "Flexible Learning",
      description:
        "Study at your own pace with 24/7 access to course materials",
      image:
        "https://media.licdn.com/dms/image/v2/D4D12AQHu0JhzalJHyg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690739119374?e=2147483647&v=beta&t=HfZrzk0OziAfuBTGoTrN49cLm66sX0I70Q11f7E1SoU",
    },
  ];

  const courses = [
    // {
    //   title: "Computer Graphics",
    //   timeframe: "4 weeks",
    //   description:
    //     "Master digital design principles and industry-standard software",
    //   skills: ["Adobe Creative Suite", "3D Modeling", "Digital Design"],
    //   students: 234,
    //   rating: 4.8,
    // },
    // {
    //   title: 'Internet Usage',
    //   timeframe: '3 weeks',
    //   description: 'Learn advanced internet navigation and online security practices',
    //   skills: ['Web Safety', 'Digital Literacy', 'Online Research'],
    //   students: 189,
    //   rating: 4.6
    // },
    {
      title: "Computer Components & Troubleshooting",
      timeframe: "5 weeks",
      description: "Understand hardware components and solve common PC issues",
      skills: ["Hardware Repair", "System Diagnostics", "Maintenance"],
      students: 3,
      rating: 4.9,
},
    // {
    //   title: "MS Office & G Suite Usage",
    //   timeframe: "6 weeks",
    //   description:
    //     "Master essential productivity tools for the modern workplace",
    //   skills: ["Document Processing", "Data Analysis", "Cloud Computing"],
    //   students: 456,
    //   rating: 4.7,
    // },
    // {
    //   title: "E-Banking",
    //   timeframe: "2 weeks",
    //   description: "Navigate digital banking systems safely and efficiently",
    //   skills: ["Digital Transactions", "Security Protocols", "Mobile Banking"],
    //   students: 167,
    //   rating: 4.5,
    // },
    {
      title: "Web Design & Development",
      timeframe: "8 weeks",
      description: "Create modern, responsive websites from scratch",
      skills: ["HTML/CSS", "JavaScript", "Responsive Design"],
      students: 5,
      rating: 4.2,
    },
    {
      title: "Professional Skills",
      timeframe: "4 weeks",
      description: "Develop essential workplace and communication skills",
      skills: ["Communication", "Leadership", "Time Management"],
      students: 2,
      rating: 4.7,
    },
  ];

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // Show loader for 2 seconds

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    setIsVisible(true);

    return () => {
      clearInterval(slideTimer);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <IgaThriveLoader />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      <Navbar />
      {/* Hero Section with Carousel */}
      <div className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 
              ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
          >
            <div className="absolute inset-0 bg-black/50" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                y: currentSlide === index ? 0 : 20,
              }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-white"
            >
              <h1 className="text-5xl font-bold mb-4 text-center max-w-3xl">
                {slide.title}
              </h1>
              <p className="text-xl mb-8 text-center max-w-2xl">
                {slide.description}
              </p>
              <Link
                to="/register"
                className="px-8 py-4 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 
                  transform hover:scale-105 flex items-center gap-2 group"
              >
                Get Started
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                ${currentSlide === index ? "bg-white w-8" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      {/* Founder Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-2">
        <div className="grid md:grid-cols-2 gap-12 items-center">
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="relative"
  >
    <div className="aspect-w-3 aspect-h-4 rounded-2xl overflow-hidden md:block hidden">
      <img
        src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3NjeWlkdzMxdmEwMnE1YTJmejVwbXVwMXptMGwxc2thMDNrNXdnbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vXfu0uxx5zH4blIzd3/giphy.webp"
        alt="Founder"
        className="w-fit h-fit object-cover"
      />
    </div>
    {/* <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg">
      <p className="font-semibold">Founded in 2024</p>
    </div> */}
  </motion.div>

  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="space-y-5"
  >
    <span className="text-blue-600 font-extrabold text-4xl">
      OUR STORY
    </span>
    <h2 className="text-3xl font-bold">
      Bridging the Digital Divide
    </h2>
    <p className="text-gray-600 leading-relaxed">
      I developed a passion for technology in primary school but lacked access to resources. This led me to study Software Engineering at ALU, where I saw many young people struggling due to a lack of digital skills.
    </p>
    <p className="text-gray-600 leading-relaxed">
      To address this, I founded IgaThrive, aiming to equip people with essential digital skills for better job and business opportunities.
    </p>
    <p className="text-gray-900 leading-relaxed">
      Founder & CEO (IgaThrive)
    </p>
  </motion.div>
</div>

        </div>
      </div>

      {/* Stats Section with Animation */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { label: "Active Students", value: "10+", icon: Users },
              { label: "Courses Offered", value: "7", icon: BookOpen },
              { label: "Expert Instructors", value: "5+", icon: Star },
              { label: "Success Rate", value: "95%", icon: CheckCircle },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-lg bg-gray-800 text-white"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Courses Section */}
      <div className="py-16 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Available Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start your journey to professional excellence with our carefully
            curated courses
          </p>
        </motion.div>

        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              variants={fadeInUp}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 
                hover:shadow-xl hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {course.title}
                  </h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {course.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-2" />
                    {course.timeframe}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    {course.students} students enrolled
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm font-medium text-gray-700">
                    Skills you'll gain:
                  </p>
                  {course.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {skill}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link
                    to="/register"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                      transition-colors duration-300 text-center"
                  >
                    Enroll Now
                  </Link>
                  <Link
                    to={`/features`}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 
                      transition-colors duration-300 flex items-center gap-2 group"
                  >
                    Details
                    <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Call to Action Section */}
      <div className=" py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Ready to Start Your Journey?
            </h2>
            <p className="text-blue-950 max-w-2xl mx-auto">
              Join thousands of students who have already transformed their
              lives through digital literacy
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full 
                hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 gap-2 group"
            >
              Get Started Today
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
