import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Filter, 
  Download, 
  Reply, 
  XCircle, 
  CheckCircle, 
  RefreshCw,
  ArrowRight,
  Clock,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MentorSide from "../components/MentorSide";

const FeedbackCard = ({ feedback, onReply, getStatusColor }) => {
  const statusIcons = {
    "Pending": <Clock className="mr-2 text-yellow-500" />,
    "In Progress": <RefreshCw className="mr-2 text-blue-500" />,
    "Resolved": <CheckCircle className="mr-2 text-green-500" />,
    "Closed": <XCircle className="mr-2 text-gray-500" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-all"
    >
      <div className="flex-1 mb-4 md:mb-0">
        <div className="flex items-center mb-2">
          <h3 className="text-lg font-semibold mr-3">{feedback.student}</h3>
          <Badge variant={feedback.type === "Feedback" ? "secondary" : "outline"}>
            {feedback.type}
          </Badge>
        </div>
        <p className="text-gray-600 mb-2">{feedback.message}</p>
        <div className="flex items-center text-sm text-gray-500">
          {statusIcons[feedback.status]}
          <span className={getStatusColor(feedback.status)}>{feedback.status}</span>
          <ArrowRight className="mx-2 w-4 h-4" />
          <span>{feedback.date}</span>
        </div>
      </div>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => onReply(feedback)}
        className="ml-4"
      >
        <Reply className="mr-2 w-4 h-4" /> Reply
      </Button>
    </motion.div>
  );
};

const Feedback = () => {
  const [filter, setFilter] = useState("all");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState([
    {
      id: 1,
      student: "Alice Johnson",
      type: "Request",
      message: "Can we get additional resources for Module 3?",
      date: "2024-11-18",
      status: "Pending"
    },
    {
      id: 2,
      student: "Bob Smith",
      type: "Feedback",
      message: "The course content is excellent, but the pacing is too fast.",
      date: "2024-11-19",
      status: "In Progress"
    },
    {
      id: 3,
      student: "Emma Brown",
      type: "Request",
      message: "Could we have live Q&A sessions?",
      date: "2024-11-20",
      status: "Resolved"
    },
    {
      id: 4,
      student: "James Wilson",
      type: "Feedback",
      message: "Great course structure and clear explanations!",
      date: "2024-11-17",
      status: "Closed"
    }
  ]);

  const filteredFeedback = filter === "all" 
    ? feedbackData 
    : feedbackData.filter((f) => f.type === filter);

  const handleReply = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleStatusChange = (status) => {
    if (selectedFeedback) {
      setFeedbackData(prev => 
        prev.map(item => 
          item.id === selectedFeedback.id 
            ? {...item, status} 
            : item
        )
      );
      setIsModalOpen(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending": return "text-yellow-500";
      case "In Progress": return "text-blue-500";
      case "Resolved": return "text-green-500";
      case "Closed": return "text-gray-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="hidden lg:block lg:w-1/4 xl:w-1/5 bg-gray-800 text-white">
        <MentorSide />
      </div>

      {/* Content */}
      <div className="w-full lg:w-3/4 xl:w-4/5 px-4 py-6">
        <Card className="w-full max-w-full mx-auto lg:max-w-4xl">
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <MessageSquare className="mr-3 w-6 h-6 text-blue-600" />
                <span className="text-base sm:text-lg">Student Feedback & Requests</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert("Downloading feedback...")}
              >
                <Download className="mr-2 w-4 h-4" /> Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex space-x-2 overflow-x-auto mb-6">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="min-w-[100px]"
              >
                <Filter className="mr-2 w-4 h-4" /> All
              </Button>
              <Button
                variant={filter === "Feedback" ? "default" : "outline"}
                onClick={() => setFilter("Feedback")}
                className="min-w-[100px]"
              >
                Feedback
              </Button>
              <Button
                variant={filter === "Request" ? "default" : "outline"}
                onClick={() => setFilter("Request")}
                className="min-w-[100px]"
              >
                Requests
              </Button>
            </div>

            {/* Feedback List */}
            <AnimatePresence>
              {filteredFeedback.length > 0 ? (
                filteredFeedback.map((feedback) => (
                  <FeedbackCard
                    key={feedback.id}
                    feedback={feedback}
                    onReply={handleReply}
                    getStatusColor={getStatusColor}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500 py-6 flex flex-col items-center"
                >
                  <AlertTriangle className="w-10 h-10 mb-4 text-gray-400" />
                  <p className="text-sm">No feedback available matching your filter.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Reply Modal */}
        <AnimatePresence>
          {isModalOpen && selectedFeedback && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl"
              >
                <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
                  <Reply className="mr-3 text-blue-600" />
                  Reply to {selectedFeedback.student}
                </h2>
                <textarea
                  className="w-full h-32 border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Write your response..."
                />
                <div className="flex flex-wrap space-y-2 sm:space-x-2 sm:space-y-0">
                  <Button variant="success" onClick={() => handleStatusChange("Resolved")}>
                    <CheckCircle className="mr-2" /> Resolve
                  </Button>
                  <Button variant="destructive" onClick={() => handleStatusChange("Closed")}>
                    <XCircle className="mr-2" /> Close
                  </Button>
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Feedback;
