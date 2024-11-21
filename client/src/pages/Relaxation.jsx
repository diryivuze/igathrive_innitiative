import React, { useState, useEffect } from "react";
import {
  Activity,
  Heart,
  Smile,
  Moon,
  Timer,
  RefreshCw,
  Circle,
  Menu,
  X
} from "lucide-react";
import StudentSide from "../components/StudentSide";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Relaxation = () => {
  const [activeTab, setActiveTab] = useState("breathing");
  const [score, setScore] = useState(0);
  const [breathPhase, setBreathPhase] = useState("inhale");
  const [breathProgress, setBreathProgress] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showStreak, setShowStreak] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Breathing exercise timer
  useEffect(() => {
    if (activeTab === "breathing") {
      const interval = setInterval(() => {
        setBreathProgress((prev) => {
          if (prev >= 100) {
            setBreathPhase((phase) =>
              phase === "inhale"
                ? "hold"
                : phase === "hold"
                ? "exhale"
                : "inhale"
            );
            return 0;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [activeTab, breathPhase]);

  const handleGameClick = () => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < 300) {
      setStreakCount((prev) => prev + 1);
      setShowStreak(true);
      setTimeout(() => setShowStreak(false), 1000);
    } else {
      setStreakCount(0);
    }
    setLastClickTime(currentTime);
    setScore(score + 1 + streakCount);
  };

  const resetGame = () => {
    setScore(0);
    setStreakCount(0);
  };

  const games = [
    { id: "breathing", title: "Breathing Exercise", icon: Timer },
    { id: "clicker", title: "Zen Clicker", icon: Circle },
  ];

  const getBreathingInstructions = () => {
    switch (breathPhase) {
      case "inhale":
        return "Breathe in slowly...";
      case "hold":
        return "Hold your breath...";
      case "exhale":
        return "Exhale gently...";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 relative">
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </Button>

      {/* Responsive Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <StudentSide />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6 space-y-6 mt-16 lg:mt-0">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 justify-center lg:justify-start">
          <Activity className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl md:text-3xl font-bold">Relaxation Zone</h1>
        </div>

        {/* Game Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {games.map((game) => (
            <Button
              key={game.id}
              onClick={() => setActiveTab(game.id)}
              className={`h-auto p-4 w-full ${
                activeTab === game.id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <game.icon className="w-5 h-5 mr-2" />
              <span className="text-sm sm:text-base">{game.title}</span>
            </Button>
          ))}
        </div>

        {/* Breathing Exercise */}
        {activeTab === "breathing" && (
          <Card className="relative overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Timer className="w-5 h-5 text-blue-500" />
                Guided Breathing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col items-center space-y-6">
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 transition-all duration-500 flex items-center justify-center ${
                    breathPhase === "inhale"
                      ? "border-blue-500 scale-110"
                      : breathPhase === "hold"
                      ? "border-green-500 scale-100"
                      : "border-purple-500 scale-90"
                  }`}
                >
                  <div className="text-base sm:text-lg font-medium text-gray-700 text-center px-2">
                    {getBreathingInstructions()}
                  </div>
                </div>
                <Progress value={breathProgress} className="w-full max-w-md" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Zen Clicker */}
        {activeTab === "clicker" && (
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Circle className="w-5 h-5 text-blue-500" />
                Zen Clicker
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6 p-4 sm:p-6">
              <div className="relative">
                <button
                  onClick={handleGameClick}
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-blue-500 text-white rounded-full text-xl sm:text-2xl md:text-3xl font-semibold shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
                >
                  {score}
                </button>
                {showStreak && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-500 font-bold animate-bounce text-sm sm:text-base">
                    +{streakCount} Streak!
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Reset</span>
                </Button>
              </div>

              <div className="text-center space-y-2">
                <p className="text-gray-600 text-sm sm:text-base">
                  Current Streak: {streakCount}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Click faster to build combos!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips Card */}
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-600">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <p className="text-xs sm:text-sm">
                Taking regular breaks helps improve focus and reduce stress.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Relaxation;