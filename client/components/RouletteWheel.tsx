import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RouletteWheelProps {
  onSpinComplete: (result: number) => void;
  isSpinning: boolean;
  className?: string;
}

// Robux prizes in roulette sections
const ROBUX_PRIZES = [
  1, 5, 1, 10, 2, 1, 25, 1, 3, 1, 50, 2, 1, 5, 1, 100, 1, 2, 1, 10, 3, 1, 5, 1
];

export function RouletteWheel({ onSpinComplete, isSpinning, className }: RouletteWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const spin = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    // Calculate random final position
    const extraSpins = 5 + Math.random() * 3; // 5-8 full rotations
    const randomIndex = Math.floor(Math.random() * ROBUX_PRIZES.length);
    const sectionAngle = 360 / ROBUX_PRIZES.length;
    const finalAngle = randomIndex * sectionAngle;
    const totalRotation = extraSpins * 360 + finalAngle;
    
    setRotation(totalRotation);

    // Animation completes after 4 seconds (matching CSS)
    setTimeout(() => {
      setIsAnimating(false);
      const resultRobux = ROBUX_PRIZES[randomIndex];
      onSpinComplete(resultRobux);
    }, 4000);
  };

  useEffect(() => {
    if (isSpinning && !isAnimating) {
      spin();
    }
  }, [isSpinning, isAnimating]);

  const getSegmentColor = (index: number) => {
    const colors = [
      "from-red-500 to-red-600",
      "from-gray-800 to-gray-900", 
      "from-red-500 to-red-600",
      "from-gray-800 to-gray-900"
    ];
    return colors[index % colors.length];
  };

  const getTextColor = (index: number) => {
    return index % 2 === 0 ? "text-white" : "text-white";
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Outer decorative ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 p-3 shadow-2xl">
        {/* Inner wheel container */}
        <div className="relative w-96 h-96 rounded-full bg-gradient-to-br from-yellow-600 to-yellow-700 p-2">
          {/* Main wheel */}
          <div 
            className={cn(
              "relative w-full h-full rounded-full overflow-hidden shadow-inner",
              isAnimating && "animate-spin-wheel"
            )}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isAnimating ? 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
            }}
          >
            {/* Wheel segments */}
            {ROBUX_PRIZES.map((prize, index) => {
              const segmentAngle = 360 / ROBUX_PRIZES.length;
              const startAngle = index * segmentAngle;
              
              return (
                <div
                  key={index}
                  className={cn(
                    "absolute inset-0 rounded-full",
                    `bg-gradient-to-br ${getSegmentColor(index)}`
                  )}
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((startAngle + segmentAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle + segmentAngle - 90) * Math.PI / 180)}%)`
                  }}
                >
                  {/* Prize text */}
                  <div
                    className="absolute flex flex-col items-center justify-center text-center"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${120 * Math.cos((startAngle + segmentAngle/2 - 90) * Math.PI / 180)}px, ${120 * Math.sin((startAngle + segmentAngle/2 - 90) * Math.PI / 180)}px) rotate(${startAngle + segmentAngle/2}deg)`,
                    }}
                  >
                    <div className={cn("font-bold text-sm", getTextColor(index))}>
                      {prize}
                    </div>
                    <div className={cn("text-xs", getTextColor(index))}>
                      R$
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Segment borders */}
            {ROBUX_PRIZES.map((_, index) => {
              const angle = (index * 360) / ROBUX_PRIZES.length;
              return (
                <div
                  key={`border-${index}`}
                  className="absolute bg-yellow-400 origin-bottom"
                  style={{
                    left: '50%',
                    bottom: '50%',
                    width: '2px',
                    height: '50%',
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                  }}
                />
              );
            })}
          </div>

          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 border-4 border-yellow-200 shadow-lg flex items-center justify-center">
            <div className="text-yellow-800 font-bold text-lg">R$</div>
          </div>
        </div>

        {/* Pointer/Arrow */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-yellow-600 drop-shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}
