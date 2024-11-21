import { useState } from "react";
import toast from 'react-hot-toast';

import {
  FaUser,
  FaLock,
  FaHome,
  FaEye,
  FaEyeSlash,
  FaEnvelope,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import api from '../utils/axios';

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const registerResponse = await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (registerResponse.data) {
        toast.success('Registration successful! Logging you in...');

        const loginResponse = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password,
        });

        if (loginResponse.data.access_token) {
          localStorage.setItem('token', loginResponse.data.access_token);
          localStorage.setItem('userRole', loginResponse.data.role);

          toast.success('Login successful! Redirecting...', {
            duration: 2000,
          });

          setTimeout(() => {
            switch (loginResponse.data.role) {
              case 'student':
                navigate('/student-dashboard');
                break;
              case 'admin':
                navigate('/admin-dashboard');
                break;
              case 'mentor':
                navigate('/mentor-dashboard');
                break;
              default:
                navigate('/student-dashboard');
            }
          }, 1000);
        }
      }
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(err.response?.data?.detail || 'Registration failed. Please try again.');
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
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
        
        <div className="relative max-w-md mx-auto">
          <div className="bg-white rounded-2xl mt-8 shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Create an Account
            </h2>

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
                  placeholder="Username"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  autoComplete="new-password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <div className="relative">
                <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
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
                  "Register"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;














