import React from 'react';
import { useNavigate } from 'react-router-dom';
import { chakrasData } from '../mock';

const ChakraWheel = () => {
  const navigate = useNavigate();

  const handleChakraClick = (id) => {
    navigate(`/chakra/${id}`);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Central cosmic circle */}
        <div className="absolute w-32 h-32 bg-gradient-to-br from-gray-900 to-black rounded-full border-2 border-gray-700 flex items-center justify-center shadow-2xl">
          <span className="text-white text-xs font-bold text-center px-2">COSMIC<br/>ENERGY</span>
        </div>

        {/* Chakra points arranged in circle */}
        {chakrasData.map((chakra, index) => {
          const angle = (index * 360) / chakrasData.length - 90;
          const radius = 45;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <button
              key={chakra.id}
              onClick={() => handleChakraClick(chakra.id)}
              className="absolute w-20 h-20 rounded-full border-2 transition-all duration-300 hover:scale-125 hover:shadow-2xl cursor-pointer group"
              style={{
                left: `calc(50% + ${x}%)`,
                top: `calc(50% + ${y}%)`,
                transform: 'translate(-50%, -50%)',
                backgroundColor: chakra.color,
                borderColor: chakra.color,
                boxShadow: `0 0 20px ${chakra.color}40`,
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xs font-bold">
                <span className="text-shadow">{chakra.name}</span>
                <span className="text-[10px] opacity-80">{chakra.mantra}</span>
              </div>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle, ${chakra.color} 0%, transparent 70%)`,
                }}
              />
            </button>
          );
        })}

        {/* Connecting lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {chakrasData.map((_, index) => {
            const angle1 = (index * 360) / chakrasData.length - 90;
            const angle2 = ((index + 1) * 360) / chakrasData.length - 90;
            const radius = 45;
            
            const x1 = 50 + Math.cos((angle1 * Math.PI) / 180) * radius;
            const y1 = 50 + Math.sin((angle1 * Math.PI) / 180) * radius;
            const x2 = 50 + Math.cos((angle2 * Math.PI) / 180) * radius;
            const y2 = 50 + Math.sin((angle2 * Math.PI) / 180) * radius;

            return (
              <line
                key={index}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default ChakraWheel;