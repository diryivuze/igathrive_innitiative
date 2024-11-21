import React, { useState } from "react";
import {
  MessageCircle,
  Send,
  Clock,
  CheckCircle,
  RefreshCcw,
  Search,
  Menu
} from "lucide-react";
import StudentSide from "../components/StudentSide";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const StudentChat = () => {
  const [question, setQuestion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      question: "How do I access the course materials?",
      answer: "You can find all course materials under the 'Resources' tab in your enrolled course page.",
      status: "answered",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      question: "When is the next live session?",
      answer: null,
      status: "pending",
      timestamp: "5 mins ago",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      const newMessage = {
        id: messages.length + 1,
        question: question.trim(),
        answer: null,
        status: "pending",
        timestamp: "Just now",
      };
      setMessages([newMessage, ...messages]);
      setSubmitted(true);
      setQuestion("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.answer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <Button
        className="md:hidden fixed top-4 left-4 z-50 p-2"
        variant="outline"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Sidebar with responsive visibility */}
      <div className={`
        fixed md:relative w-64 h-full z-40 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <StudentSide />
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 p-4 md:p-6 space-y-6 md:ml-0 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 mt-12 md:mt-0">
          <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2">
            <MessageCircle className="w-6 md:w-8 h-6 md:h-8 text-blue-500" />
            Q&A Support Center
          </h1>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search questions..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {submitted && (
          <Alert className="bg-green-50 border-green-200 animate-fade-in-down">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <AlertDescription>
              Your question has been submitted successfully!
            </AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Ask a Question</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <textarea
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px] resize-none"
                  placeholder="Type your question here..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                <Button
                  type="submit"
                  className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-600 transition-all flex items-center gap-2 text-sm md:text-base"
                  disabled={!question.trim()}
                >
                  <Send className="w-3 md:w-4 h-3 md:h-4" />
                  <span className="hidden sm:inline">Submit Question</span>
                  <span className="sm:hidden">Submit</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-blue-500" />
            Recent Questions
          </h2>

          <div className="grid gap-4">
            {filteredMessages.map((msg) => (
              <Card
                key={msg.id}
                className="transform hover:-translate-y-1 transition-all duration-200"
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <p className="font-medium text-gray-900 text-sm md:text-base">{msg.question}</p>
                      {msg.answer && (
                        <div className="mt-2 md:mt-3 pl-3 md:pl-4 border-l-2 border-blue-200">
                          <p className="text-gray-600 text-sm md:text-base">{msg.answer}</p>
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-500">
                        <Clock className="w-3 md:w-4 h-3 md:h-4" />
                        <span>{msg.timestamp}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            msg.status === "answered"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {msg.status === "answered" ? "Answered" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMessages.length === 0 && (
            <Card className="p-6 md:p-8 text-center text-gray-500">
              <div className="flex flex-col items-center gap-2">
                <MessageCircle className="w-8 md:w-12 h-8 md:h-12 text-gray-300" />
                <p className="text-sm md:text-base">No messages found matching your search.</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentChat;