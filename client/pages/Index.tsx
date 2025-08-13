import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RouletteWheel } from "@/components/RouletteWheel";
import { RobloxPopup } from "@/components/RobloxPopup";
import { SuccessPopup } from "@/components/SuccessPopup";
import { cn } from "@/lib/utils";

export default function Index() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showRobloxPopup, setShowRobloxPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [robuxWon, setRobuxWon] = useState<number>(0);
  const [submittedUsername, setSubmittedUsername] = useState<string>("");

  const handleSpin = () => {
    if (!isSpinning) {
      setIsSpinning(true);
    }
  };

  const handleSpinComplete = (robuxAmount: number) => {
    setIsSpinning(false);
    setRobuxWon(robuxAmount);
    setShowRobloxPopup(true);
  };

  const handleRobloxSubmit = (username: string) => {
    setSubmittedUsername(username);
    setShowRobloxPopup(false);
    setShowSuccessPopup(true);
  };

  const handleRobloxClose = () => {
    setShowRobloxPopup(false);
  };

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)]"></div>
      
      {/* Title positioned at top */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-2">
          🎰 FREE ROBUX
        </h1>
        <p className="text-lg text-gray-300">
          Spin the wheel and win Robux instantly!
        </p>
      </div>

      {/* Roulette centered with absolute positioning */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <RouletteWheel
          onSpinComplete={handleSpinComplete}
          isSpinning={isSpinning}
        />
      </div>
      
      {/* Spin Button positioned below roulette */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-56 flex flex-col items-center space-y-4">
        <Button
          size="lg"
          className={cn(
            "px-10 py-3 text-xl font-bold transition-all duration-200 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border-2 border-yellow-300",
            isSpinning && "opacity-75 cursor-not-allowed"
          )}
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? "🎰 SPINNING..." : "🎯 SPIN FOR FREE ROBUX!"}
        </Button>

        {isSpinning && (
          <div className="text-center animate-pulse">
            <div className="text-lg text-yellow-400 font-semibold">
              🎲 Good luck! You always win Robux!
            </div>
          </div>
        )}
      </div>

      {/* Footer info positioned at bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-10">
        <div className="text-sm text-gray-500">
          🎮 100% Free • Unlimited Spins • Always Win!
        </div>
      </div>

      {/* Popups */}
      <RobloxPopup
        isOpen={showRobloxPopup}
        robuxAmount={robuxWon}
        onClose={handleRobloxClose}
        onSubmit={handleRobloxSubmit}
      />

      <SuccessPopup
        isOpen={showSuccessPopup}
        username={submittedUsername}
      />
    </div>
  );
}
