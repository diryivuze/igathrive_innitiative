import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  BookOpen,
  Users,
  Lightbulb,
  TrendingUp,
  Award,
  Activity,
  Bell,
  Mail,
  Menu, // Hamburger Menu Icon
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const performanceData = [
  { name: 'Week 4', completion: 0 },
  { name: 'Week 8', completion: 2 },
  { name: 'Week 12', completion: 4 },
  { name: 'Week 16', completion: 10 },
];

const courseEngagement = [
  { name: 'Computer Graphics', students: 5, completion: 2 },
  { name: 'Web Design', students: 8, completion: 3 },
  { name: 'E-Banking', students: 2, completion: 2 },
  { name: 'Professional Skills', students: 5, completion: 3 },
];

const studentDistribution = [
  { name: 'Active', value: 10 },
  { name: 'Inactive', value: 8 },
  { name: 'Completed', value: 10 },
];

const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility

  const StatCard = ({ icon: Icon, title, value, trend, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span
            className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'} flex items-center`}
          >
            <TrendingUp
              className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`}
            />
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <h3 className="mt-4 text-gray-600 text-sm font-medium">{title}</h3>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );

  const RecentActivity = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <button className="text-blue-500 text-sm hover:underline">View All</button>
      </div>
      <div className="space-y-4">
        {[
          { icon: Award, text: 'Chancelline N. completed Professional Skills course', time: '2h ago' },
          { icon: Users, text: '15 new students enrolled this week', time: '5h ago' },
          { icon: Mail, text: 'New course feedback received', time: '1d ago' },
        ].map((activity, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            {React.createElement(activity.icon, {
              className: 'w-5 h-5 text-gray-500 mt-1',
            })}
            <div className="flex-1">
              <p className="text-sm text-gray-800">{activity.text}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex">
      {/* Mobile Hamburger Menu Button */}
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="lg:hidden p-4 text-gray-600"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className={`p-6 w-full max-w-7xl mx-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : ''}`}>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
            <p className="text-gray-600">Here's what's happening with your courses today.</p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="relative p-2 text-gray-600 hover:text-gray-800">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard icon={BookOpen} title="Active Courses" value="6" trend={12} color="bg-blue-500" />
          <StatCard icon={Users} title="Total Students" value="20" trend={8} color="bg-green-500" />
          <StatCard icon={Activity} title="Completion Rate" value="70%" trend={-4} color="bg-purple-500" />
          <StatCard icon={Lightbulb} title="New Ideas Shared" value="9" trend={5} color="bg-yellow-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Student Performance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completion" stroke="#0088FE" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Course Engagement</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseEngagement}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#0088FE" />
                <Bar dataKey="completion" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">Student Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={studentDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {studentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
