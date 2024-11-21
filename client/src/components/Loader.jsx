import React from 'react';

const IgaThriveLoader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[240px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-inner">
      <div className="relative w-40 h-40 transform hover:scale-105 transition-transform duration-100">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
        
        {/* Outer spinning ring with segments */}
        <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="10"
                x2="50"
                y2="20"
                className="stroke-blue-600"
                strokeWidth="4"
                strokeLinecap="round"
                transform={`rotate(${i * 30} 50 50)`}
                opacity={1 - (i * 0.07)}
              />
            ))}
          </svg>
        </div>

        {/* Middle rotating hexagon */}
        <div className="absolute inset-0 animate-[spin_4s_linear_infinite_reverse]">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <polygon
              points="50,20 80,35 80,65 50,80 20,65 20,35"
              className="stroke-blue-500 fill-none"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Inner pulsing circle */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="25"
              className="stroke-blue-400 fill-none animate-ping"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Center content container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Central dot with ripple effect */}
          <div className="relative mb-3">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping" />
          </div>
          
          {/* Text content */}
          <div className="text-center bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full">
            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse">
              <span className="text-xl">Iga</span>
              <span className="text-lg">Thrive</span>
            </div>
            <div className="text-blue-400/80 text-xs mt-1 font-medium tracking-wider">
              {[..."Loading"].map((letter, i) => (
                <span
                  key={i}
                  className="inline-block animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Orbiting dots */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 120}deg) translateX(60px)`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.6
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default IgaThriveLoader;