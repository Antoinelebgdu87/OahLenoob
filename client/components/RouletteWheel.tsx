import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RouletteWheelProps {
  onSpinComplete: (result: number) => void;
  isSpinning: boolean;
  className?: string;
}

// Roulette numbers in European wheel order
const ROULETTE_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
  24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

// Prize values corresponding to the wheel positions  
const PRIZE_VALUES = [100, 10, 30, 20, 50];

export function RouletteWheel({ onSpinComplete, isSpinning, className }: RouletteWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNumberColor = (num: number): string => {
    if (num === 0) return "text-roulette-green bg-roulette-green";
    // Traditional roulette red/black pattern
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) 
      ? "text-white bg-roulette-red" 
      : "text-white bg-roulette-black";
  };

  const spin = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    
    // Calculate random final position
    const extraSpins = 5 + Math.random() * 3; // 5-8 full rotations
    const randomIndex = Math.floor(Math.random() * ROULETTE_NUMBERS.length);
    const sectionAngle = 360 / ROULETTE_NUMBERS.length;
    const finalAngle = randomIndex * sectionAngle;
    const totalRotation = extraSpins * 360 + finalAngle;
    
    setRotation(totalRotation);

    // Animation completes after 4 seconds (matching CSS)
    setTimeout(() => {
      setIsAnimating(false);
      const resultNumber = ROULETTE_NUMBERS[randomIndex];
      onSpinComplete(resultNumber);
    }, 4000);
  };

  useEffect(() => {
    if (isSpinning && !isAnimating) {
      spin();
    }
  }, [isSpinning, isAnimating]);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Wheel container */}
      <div className="relative">
        {/* Pointer/Arrow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 z-20">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-roulette-gold drop-shadow-lg"></div>
        </div>

        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-2">
          {/* Inner wheel */}
          <div 
            className={cn(
              "relative w-80 h-80 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-yellow-500 shadow-2xl",
              isAnimating && "animate-spin-wheel"
            )}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isAnimating ? 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
            }}
          >
            {/* Numbers around the wheel */}
            {ROULETTE_NUMBERS.map((number, index) => {
              const angle = (index * 360) / ROULETTE_NUMBERS.length;
              const radians = (angle * Math.PI) / 180;
              const radius = 140;
              const x = Math.cos(radians - Math.PI / 2) * radius;
              const y = Math.sin(radians - Math.PI / 2) * radius;

              return (
                <div
                  key={index}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(${angle}deg)`
                  }}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-yellow-400 shadow-lg",
                    getNumberColor(number)
                  )}>
                    {number}
                  </div>
                </div>
              );
            })}

            {/* Center circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-yellow-300 shadow-lg flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gray-800"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
