import React, { useState } from "react";
import { Plus, X, Edit, Trash2, CheckCircle, AlertTriangle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar";

const initialMentors = [
  {
    id: 1,
    name: "Loue Sauveur Christian",
    courses: "Web Design & Development",
    email: "l.christian@igathrive.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Michael Alain Muhirwa",
    courses: "Computer Components & Troubleshooting",
    email: "a.muhirwa@igathrive.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Vanessa Uwonkunda",
    courses: "E-Banking",
    email: "v.uwonkunda@igathrive.com",
    status: "Active",
  },
  {
    id: 4,
    name: "David Niyonshuti",
    courses: "Computer Graphics Instructor",
    email: "d.niyonshuti@igathrive.com",
    status: "Active",
  },
  {
    id: 5,
    name: "Daniel Iryivuze",
    courses: "Data Science",
    email: "ceo@igathrive.com",
    status: "Inactive",
  },
  
  {
    id: 6,
    name: "Sonia Ikirezi Hirwa",
    courses: "Professional Skills ",
    email: "s.hirwa@igathrive.com",
    status: "Active",
  },
  {
    id: 7,
    name: "Daniel Iryivuze",
    courses: "MS Office & G Suite Usage ",
    email: "ceo@igathrive.com",
    status: "Active",
  }
];

const Mentor = () => {
  const [mentors, setMentors] = useState(initialMentors);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMentor, setNewMentor] = useState({
    firstName: "",
    lastName: "",
    course: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [alertMessage, setAlertMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 5;

  const [editMentor, setEditMentor] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const handleAddMentor = () => {
    if (newMentor.password !== newMentor.confirmPassword) {
      toast.error("Passwords do not match!", { theme: "colored" });
      return;
    }
    setMentors([
      ...mentors,
      {
        ...newMentor,
        id: mentors.length + 1,
        status: "Active",
        name: `${newMentor.firstName} ${newMentor.lastName}`,
      },
    ]);
    toast.success("Mentor added successfully!", { theme: "colored" });
    setIsModalOpen(false);
    setNewMentor({
      firstName: "",
      lastName: "",
      courses: "",
      startDate: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleDeleteMentor = (id) => {
    setMentors(mentors.filter((mentor) => mentor.id !== id));
    toast.success("Mentor deleted successfully!", { theme: "colored" });
    setShowConfirmDelete(null);
  };

  const toggleStatus = (id) => {
    setMentors(
      mentors.map((mentor) =>
        mentor.id === id
          ? { ...mentor, status: mentor.status === "Active" ? "Inactive" : "Active" }
          : mentor
      )
    );
    toast.success("Mentor status updated!", { theme: "colored" });
  };

  const totalMentors = mentors.length;
  const totalPages = Math.ceil(totalMentors / mentorsPerPage);

  const paginatedMentors = mentors.slice(
    (currentPage - 1) * mentorsPerPage,
    currentPage * mentorsPerPage
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <ToastContainer />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mentor Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            Register Mentor
          </button>
        </div>

        {/* Mentor Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">Name</th>
                <th className="p-3">Course</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMentors.map((mentor) => (
                <tr key={mentor.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3">{mentor.name}</td>
                  <td className="p-3">{mentor.courses}</td>
                  <td className="p-3">{mentor.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        mentor.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {mentor.status}
                    </span>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => toggleStatus(mentor.id)}
                      className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditMentor(mentor)}
                      className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowConfirmDelete(mentor.id)}
                      className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Modal for New Mentor */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 h-4/5 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Register Mentor</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newMentor.firstName}
                  onChange={(e) =>
                    setNewMentor({ ...newMentor, firstName: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newMentor.lastName}
                  onChange={(e) =>
                    setNewMentor({ ...newMentor, lastName: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Course"
                  value={newMentor.courses}
                  onChange={(e) =>
                    setNewMentor({ ...newMentor, courses: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={newMentor.startDate}
                  onChange={(e) =>
                    setNewMentor({ ...newMentor, startDate: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newMentor.email}
                  onChange={(e) =>
                    setNewMentor({ ...newMentor, email: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={newMentor.phone}
                  onChange={(e) =>
                    setNewMentor({ ...newMentor, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newMentor.password}
                  onChange={(e) =>
                    setNewMentor({ ...newMentor, password: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={newMentor.confirmPassword}
                  onChange={(e) =>
                    setNewMentor({ ...newMentor, confirmPassword: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleAddMentor}
                className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Register Mentor
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentor;
