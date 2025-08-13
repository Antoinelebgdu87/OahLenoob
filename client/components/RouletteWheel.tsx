import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface RouletteWheelProps {
  onSpinComplete: (result: number) => void;
  isSpinning: boolean;
  className?: string;
}

// Robux prizes with weights (smaller prizes more common)
const ROBUX_PRIZES = [
  { amount: 1, weight: 30, color: "bg-blue-500" },
  { amount: 2, weight: 25, color: "bg-green-500" },
  { amount: 5, weight: 20, color: "bg-purple-500" },
  { amount: 1, weight: 15, color: "bg-blue-500" },
  { amount: 10, weight: 8, color: "bg-orange-500" },
  { amount: 3, weight: 12, color: "bg-cyan-500" },
  { amount: 1, weight: 20, color: "bg-blue-500" },
  { amount: 25, weight: 4, color: "bg-red-500" },
  { amount: 2, weight: 18, color: "bg-green-500" },
  { amount: 50, weight: 2, color: "bg-yellow-500" },
  { amount: 1, weight: 25, color: "bg-blue-500" },
  { amount: 5, weight: 15, color: "bg-purple-500" },
  { amount: 1, weight: 20, color: "bg-blue-500" },
  { amount: 100, weight: 1, color: "bg-pink-500" },
  { amount: 3, weight: 16, color: "bg-cyan-500" },
  { amount: 2, weight: 22, color: "bg-green-500" },
  { amount: 1, weight: 25, color: "bg-blue-500" },
  { amount: 10, weight: 6, color: "bg-orange-500" }
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
      const resultRobux = ROBUX_PRIZES[randomIndex].amount;
      onSpinComplete(resultRobux);
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
            {/* Robux prizes around the wheel */}
            {ROBUX_PRIZES.map((prize, index) => {
              const angle = (index * 360) / ROBUX_PRIZES.length;
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
                    "w-10 h-10 rounded-full flex flex-col items-center justify-center text-xs font-bold border-2 border-yellow-400 shadow-lg text-white",
                    prize.color
                  )}>
                    <div className="text-[10px]">{prize.amount}</div>
                    <div className="text-[8px]">R$</div>
                  </div>
                </div>
              );
            })}

            {/* Center circle with Robux logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-4 border-yellow-300 shadow-lg flex items-center justify-center">
              <div className="text-gray-800 font-bold text-xs">R$</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
