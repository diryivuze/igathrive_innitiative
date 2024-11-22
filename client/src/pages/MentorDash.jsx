import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MentorSide from "../components/MentorSide";
import { Bar, Pie } from "react-chartjs-2";
import { Menu } from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const MentorDash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // For actions
  const navigate = useNavigate();

  // Data for charts
  const feedbackData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        label: "Feedback",
        data: [75, 15, 10],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        hoverOffset: 4,
      },
    ],
  };

  const progressData = {
    labels: ["Assignments Completed", "Assignments Pending", "Assignments Failed"],
    datasets: [
      {
        label: "Student Progress",
        data: [80, 15, 5],
        backgroundColor: ["#2196F3", "#FFC107", "#F44336"],
        barPercentage: 0.5,
      },
    ],
  };

  // Handle button actions
  const handleViewFeedback = () => alert("Viewing feedback...");
  const handleUpdateCourse = () => alert("Updating course...");
  const handleRemoveStudent = () => setModalVisible(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-40 lg:static transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <MentorSide />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header for mobile */}
        <header className="bg-white shadow-md p-4 lg:hidden flex items-center justify-between">
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          <h1 className="hidden lg:block text-3xl font-bold text-gray-800 mb-6">
            Web Design & Development - Dashboard
          </h1>

          {/* Charts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Feedback Chart */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Course Feedback</h2>
              <Pie data={feedbackData} />
            </div>

            {/* Student Progress Chart */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Student Progress</h2>
              <Bar data={progressData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>

          {/* Course Highlights */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Course Highlights</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✅ 120 students enrolled</li>
              <li>💻 85% course completion rate</li>
              <li>📅 Next course review: 25th Nov 2024</li>
              <li>⭐ Average feedback rating: 4.5/5</li>
            </ul>
          </div>

          {/* Mentor Actions */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mentor Actions</h2>
            <div className="flex flex-wrap gap-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleViewFeedback}
              >
                View Feedback
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleUpdateCourse}
              >
                Update Course
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleRemoveStudent}
              >
                Remove Student
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Removal</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to remove this student?</p>
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => setModalVisible(false)}
              >
                Confirm
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={() => setModalVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDash;
