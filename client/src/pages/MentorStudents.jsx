import { useState } from "react";
import MentorSide from "../components/MentorSide";
import { Menu } from "lucide-react";

const studentsData = [
  { id: 1, name: "John Doe", done: 10, won: 8, failed: 1, left: 1 },
  { id: 2, name: "Jane Smith", done: 12, won: 10, failed: 1, left: 1 },
  { id: 3, name: "Michael Brown", done: 15, won: 12, failed: 2, left: 1 },
  { id: 4, name: "Emily Davis", done: 9, won: 7, failed: 1, left: 1 },
  { id: 5, name: "Chris Wilson", done: 11, won: 9, failed: 1, left: 1 },
  { id: 6, name: "Sophia Miller", done: 13, won: 11, failed: 1, left: 1 },
  { id: 7, name: "James Anderson", done: 8, won: 6, failed: 1, left: 1 },
  { id: 8, name: "Olivia Garcia", done: 14, won: 12, failed: 1, left: 1 },
  { id: 9, name: "William Martin", done: 16, won: 14, failed: 1, left: 1 },
  { id: 10, name: "Ava Thompson", done: 10, won: 8, failed: 1, left: 1 },
];

const MentorStudents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const totalPages = Math.ceil(studentsData.length / studentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * studentsPerPage;
  const currentStudents = studentsData.slice(
    startIndex,
    startIndex + studentsPerPage
  );

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
          <h1 className="text-lg font-bold text-gray-800">Students</h1>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          <h1 className="hidden lg:block text-3xl font-bold text-gray-800 mb-6">
            Students Progress
          </h1>

          {/* Students Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                    Assignments Done
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                    Won
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                    Failed
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                    Left
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-gray-600">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`border-b border-gray-200 ${
                      index % 2 === 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-700">{student.name}</td>
                    <td className="py-3 px-4 text-gray-700">{student.done}</td>
                    <td className="py-3 px-4 text-gray-700">{student.won}</td>
                    <td className="py-3 px-4 text-gray-700">{student.failed}</td>
                    <td className="py-3 px-4 text-gray-700">{student.left}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {Math.round((student.won / student.done) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`py-2 px-4 text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`py-2 px-4 text-sm font-medium ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 hover:text-blue-800"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorStudents;
