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
        {/* Pointer/Arrow - Beautiful animated indicator */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
          {/* Animated glow rings */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-gradient-to-r from-red-400 via-pink-400 to-red-500 rounded-full opacity-40 animate-pulse"></div>
            <div className="absolute inset-1 w-10 h-10 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full opacity-60 animate-ping"></div>
          </div>

          {/* Floating jewel base */}
          <div className="relative animate-bounce">
            {/* Jewel container with floating effect */}
            <div className="relative transform hover:scale-110 transition-transform duration-300">
              {/* Main jewel/crystal */}
              <div className="w-6 h-6 bg-gradient-to-br from-red-400 via-red-500 to-red-700 rounded-full shadow-2xl border-2 border-red-200 relative overflow-hidden">
                {/* Inner sparkle */}
                <div className="absolute inset-1 bg-gradient-to-tr from-red-200 to-transparent rounded-full animate-pulse"></div>
                {/* Shine effect */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-white/50 rounded-full blur-sm animate-pulse"></div>
              </div>

              {/* Arrow emanating from jewel */}
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
                {/* Arrow shadow */}
                <div className="absolute w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-black/20 blur-sm translate-x-1 translate-y-1"></div>

                {/* Main arrow with gradient */}
                <div className="relative">
                  <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-gradient-to-b from-red-500 to-red-700 drop-shadow-2xl"></div>
                  <div className="absolute w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-red-600"></div>

                  {/* Inner highlight with moving shine */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[16px] border-l-transparent border-r-transparent border-b-red-300 animate-pulse"></div>

                  {/* Moving highlight line */}
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[12px] border-l-transparent border-r-transparent border-b-white/60"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Sparkling particles */}
          <div className="absolute -top-2 -left-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute -top-1 left-6 w-1 h-1 bg-red-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1 -right-2 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-3 -left-1 w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Inner wheel container - moved to be sibling */}
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
    </div>
  );
}
