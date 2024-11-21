import React, { useState } from 'react';
import { 
  MessageCircle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  Filter,
  ChevronDown,
  User
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const initialQuestions = [
  { 
    id: 1, 
    question: "How do I submit my assignment?", 
    details: "I'm trying to submit my assignment for Computer Graphics but I can't find the submission link.",
    student: "Chancelline Niyotugendana",
    course: "Computer Graphics",
    date: "2024-11-15",
    resolved: false,
    priority: "high",
    replies: []
  },
  { 
    id: 2, 
    question: "What is the deadline for the project?", 
    details: "Need clarification on the Web Development final project deadline.",
    student: "Raissa Mpawenayo",
    course: "Web Design and Development",
    date: "2024-11-17",
    resolved: true,
    priority: "low",
    replies: [
      {
        author: "Admin",
        text: "The deadline is December 10th, 2024",
        date: "2024-11-18"
      }
    ]
  },
  { 
    id: 3, 
    question: "Error in MS Excel formula", 
    details: "I'm getting a #REF error in my spreadsheet calculation.",
    student: "Joyeuse Nsabimana (Nana)",
    course: "M.S. Office and G Suite Usage",
    date: "2024-11-19",
    resolved: false,
    priority: "medium",
    replies: []
  }
];

const QandA = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    course: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const handleResolve = (id) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, resolved: !q.resolved } : q
    ));
  };

  const handleReply = (id) => {
    if (!replyText.trim()) return;
    
    setQuestions(questions.map(q => 
      q.id === id ? {
        ...q,
        replies: [...q.replies, {
          author: 'Admin',
          text: replyText,
          date: new Date().toISOString().split('T')[0]
        }]
      } : q
    ));
    setReplyText('');
  };

  const filteredQuestions = questions.filter(q => {
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'resolved' ? q.resolved : !q.resolved);
    const matchesPriority = filters.priority === 'all' || q.priority === filters.priority;
    const matchesCourse = filters.course === 'all' || q.course === filters.course;
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.student.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesCourse && matchesSearch;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex">
    <Sidebar />
    <div className="p-6 w-full mx-auto overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageCircle className="mr-2" />
          Q&A Support Center
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search questions..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select 
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              <option value="resolved">Resolved</option>
              <option value="unresolved">Unresolved</option>
            </select>
            <select 
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <div 
            key={q.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
          >
            <div className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`font-medium ${getPriorityColor(q.priority)}`}>
                      {q.priority.charAt(0).toUpperCase() + q.priority.slice(1)} Priority
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-600">{q.course}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{q.question}</h3>
                  <p className="text-gray-600 mb-2">{q.details}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <User size={16} className="mr-1" />
                    <span>{q.student}</span>
                    <Clock size={16} className="ml-4 mr-1" />
                    <span>{q.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleResolve(q.id)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      q.resolved 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                    }`}
                  >
                    {q.resolved ? (
                      <>
                        <CheckCircle size={18} className="mr-1" />
                        Resolved
                      </>
                    ) : (
                      <>
                        <XCircle size={18} className="mr-1" />
                        Pending
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronDown 
                      size={20} 
                      className={`transform transition-transform ${
                        expandedQuestion === q.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Expanded Section */}
              {expandedQuestion === q.id && (
                <div className="mt-4 border-t pt-4">
                  {/* Replies */}
                  <div className="space-y-3 mb-4">
                    {q.replies.map((reply, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span className="font-medium">{reply.author}</span>
                          <span>{reply.date}</span>
                        </div>
                        <p className="text-gray-700">{reply.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply Form */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Type your reply..."
                      className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      onClick={() => handleReply(q.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600">No questions found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default QandA;