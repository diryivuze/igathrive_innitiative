import { useState } from "react";















import {







  FaUser,







  FaLock,







  FaHome,







  FaEye,







  FaEyeSlash,







} from "react-icons/fa";







import { useNavigate } from "react-router-dom";







import toast from 'react-hot-toast';















import api from '../utils/axios';















const Login = () => {







  const navigate = useNavigate();







  const [showPassword, setShowPassword] = useState(false);







  const [formData, setFormData] = useState({







    username: "",







    password: "",







    rememberMe: false,







  });







  const [loading, setLoading] = useState(false);







  const [error, setError] = useState("");







  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);















  const handleInputChange = (e) => {







    const { name, value, checked } = e.target;







    setFormData((prev) => ({







      ...prev,







      [name]: name === "rememberMe" ? checked : value,







    }));







    setError("");







  };























  const handleSubmit = async (e) => {







    e.preventDefault();







    setLoading(true);







    setError("");























    try {















      const response = await api.post('/auth/login', {







        email: formData.username,







        password: formData.password,







      });























      if (response.data.access_token) {







        localStorage.setItem('token', response.data.access_token);







        localStorage.setItem('userRole', response.data.role);







        if (formData.rememberMe) {







          localStorage.setItem('rememberedEmail', formData.username);







        }















        toast.success('Login successful! Redirecting...', {















          duration: 2000,















        });























        setTimeout(() => {















          switch (response.data.role) {







            case 'admin':







              navigate('/admin-dashboard');







              break;







            case 'student':







              navigate('/student-dashboard');







              break;







            case 'mentor':







              navigate('/mentor-dashboard');







              break;







            default:







              toast.error('Invalid role assigned');







              navigate('/login');







          }















        }, 1000);















      }







    } catch (err) {







      console.error('Login error:', err);







      toast.error(err.response?.data?.detail || 'Login failed. Please check your credentials.');















      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');







    } finally {







      setLoading(false);







    }















  };























  const handleForgotPassword = async () => {







    if (!formData.username) {







      setError('Please enter your email address first');







      return;







    }























    setForgotPasswordLoading(true);















    try {







      await api.post('/auth/forgot-password', {







        email: formData.username







      });















      alert('Password reset instructions have been sent to your email');







    } catch (err) {







      setError(err.response?.data?.detail || 'Failed to process forgot password request');







    } finally {







      setForgotPasswordLoading(false);







    }















  };























  return (







    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">







      <div















        className="absolute inset-0 bg-cover w-full h-full overflow-hidden"







        style={{ backgroundImage: `url('/images/login.jpg')` }}







      >







        <div className="relative inset-0 bg-black/80"></div>







        <div className="relative top-4 left-4">







          <button







            onClick={() => navigate("/")}







            className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-blue-800 hover:text-blue-600"







          >







            <FaHome className="text-2xl" />







            <span className="hidden sm:inline">Home</span>







          </button>







        </div>







        <div className="relative">







          <div className="max-w-screen-lg z-10 mx-auto">







            <div className="bg-white rounded-2xl mt-8  shadow-2xl overflow-x-hidden">







              <div className="flex flex-col md:flex-row w-full">







                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-950 to-blue-400 text-white p-12 flex-col justify-center items-center relative overflow-hidden">







                  <div className="absolute inset-0 bg-black opacity-10"></div>







                  <div className="relative z-10 text-center">







                    <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>







                    <p className="text-xl mb-8">







                      &ldquo;Empowering you to thrive with the skills of tomorrow.&rdquo;







                    </p>







                    <div className="space-y-4">







                      <p className="text-lg">✓ Access to all courses</p>







                      <p className="text-lg">✓ Track your progress</p>







                      <p className="text-lg">✓ Connect with experts</p>







                    </div>







                  </div>







                  <div className="absolute -bottom-32 -left-32 w-64 h-64 border-4 rounded-full border-opacity-30 border-t-8"></div>







                  <div className="absolute -bottom-40 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>







                </div>







                <div className="w-full md:w-1/2 p-8 lg:p-12">







                  <div className="text-center mb-8">







                    <h2 className="text-3xl font-bold text-gray-800">







                      Login to IgaThrive







                    </h2>







                    <p className="text-gray-600 mt-2">







                      Please enter your credentials to continue







                    </p>







                  </div>







                  {error && (







                    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">







                      {error}







                    </div>







                  )}















                  <form onSubmit={handleSubmit} className="space-y-6">







                    <div className="relative">







                      <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />







                      <input







                        type="text"







                        name="username"







                        value={formData.username}







                        onChange={handleInputChange}







                        placeholder="Username or Email"







                        autoComplete="username"







                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"







                        required







                      />







                    </div>







                    <div className="relative">







                      <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />







                      <input







                        type={showPassword ? "text" : "password"}







                        name="password"







                        value={formData.password}







                        onChange={handleInputChange}







                        placeholder="Password"







                        autoComplete="current-password"







                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"







                        required







                      />







                      <button







                        type="button"







                        onClick={() => setShowPassword(!showPassword)}







                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"







                      >







                        {showPassword ? <FaEyeSlash /> : <FaEye />}







                      </button>







                    </div>







                    <div className="flex items-center justify-between">







                      <label className="flex items-center">







                        <input







                          type="checkbox"







                          name="rememberMe"







                          checked={formData.rememberMe}







                          onChange={handleInputChange}







                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"







                        />







                        <span className="ml-2 text-sm text-gray-600">







                          Remember me







                        </span>







                      </label>







                      <button







                        type="button"







                        onClick={handleForgotPassword}







                        disabled={forgotPasswordLoading}







                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center"







                      >















                        {forgotPasswordLoading ? (







                          <>















                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">







                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>







                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>







                            </svg>







                            Processing...







                          </>















                        ) : (















                          'Forgot Password?'







                        )}















                      </button>







                    </div>







                    <button







                      type="submit"







                      disabled={loading}







                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 relative"







                    >







                      {loading ? (







                        <span className="flex items-center justify-center">







                          <svg







                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"







                            xmlns="http://www.w3.org/2000/svg"







                            fill="none"







                            viewBox="0 0 24 24"







                          >







                            <circle







                              className="opacity-25"







                              cx="12"







                              cy="12"







                              r="10"







                              stroke="currentColor"







                              strokeWidth="4"







                            ></circle>







                            <path







                              className="opacity-75"







                              fill="currentColor"







                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"







                            ></path>







                          </svg>







                          Processing...







                        </span>







                      ) : (







                        "Login"







                      )}







                    </button>







                  </form>







                  <p className="mt-20 text-center text-gray-600">







                    Don&apos;t have an account?{" "}







                    <button







                      onClick={() => navigate("/register")}







                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium"







                    >







                      {" "}







                      Register here







                    </button>







                  </p>







                </div>







              </div>







            </div>







          </div>







        </div>







      </div>







    </div>







  );















};























export default Login;






























































