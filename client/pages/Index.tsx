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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-roulette-gold via-yellow-400 to-roulette-gold mb-4">
          🎰 FREE ROBUX
        </h1>
        <p className="text-xl text-muted-foreground">
          Spin the wheel and win Robux instantly!
        </p>
      </div>

      {/* Centered Roulette Wheel */}
      <div className="flex flex-col items-center space-y-8">
        <RouletteWheel
          onSpinComplete={handleSpinComplete}
          isSpinning={isSpinning}
        />
        
        <Button
          size="lg"
          className={cn(
            "px-12 py-4 text-2xl font-bold transition-all duration-200 bg-roulette-gold hover:bg-yellow-500 text-roulette-black shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95",
            isSpinning && "opacity-75 cursor-not-allowed"
          )}
          onClick={handleSpin}
          disabled={isSpinning}
        >
          {isSpinning ? "🎰 SPINNING..." : "🎯 SPIN FOR FREE ROBUX!"}
        </Button>

        {isSpinning && (
          <div className="text-center animate-pulse">
            <div className="text-lg text-primary font-semibold">
              🎲 Good luck! You always win Robux!
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <div className="text-sm text-muted-foreground">
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
