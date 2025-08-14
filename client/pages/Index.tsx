import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RouletteWheel } from "@/components/RouletteWheel";
import { RobloxPopup } from "@/components/RobloxPopup";
import { SuccessPopup } from "@/components/SuccessPopup";
import { BoostTimer } from "@/components/BoostTimer";
import { TermsScreen } from "@/components/TermsScreen";
import { useBoost } from "@/hooks/use-boost";
import { cn } from "@/lib/utils";

export default function Index() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showRobloxPopup, setShowRobloxPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [robuxWon, setRobuxWon] = useState<number>(0);
  const [submittedUsername, setSubmittedUsername] = useState<string>("");

  const { boostState, acceptTerms } = useBoost();

  const handleSpin = () => {
    if (!isSpinning && boostState.gameUnlocked) {
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
    <>
      {/* Game content - only visible when unlocked */}
      {boostState.gameUnlocked && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
          {/* Simple centered content */}
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Title */}
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 tracking-wider">
              🎰 FREE ROBUX
            </h1>

            {/* Roulette - directly centered */}
            <RouletteWheel
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
              isBoostActive={boostState.isBoostActive}
            />

            {/* Spin Button */}
            <Button
              className={cn(
                "px-8 py-3 text-lg font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 shadow-lg rounded-xl transition-all duration-200 hover:shadow-xl tracking-wide uppercase",
                isSpinning && "opacity-75 cursor-not-allowed",
              )}
              onClick={handleSpin}
              disabled={isSpinning}
            >
              {isSpinning ? "Spinning..." : "Spin for Free Robux"}
            </Button>

            {/* Manual control hint */}
            <div className="text-center text-gray-400 text-sm space-y-1">
              <div>🎮 Mode Manuel Activé</div>
              <div>Ctrl+F1: Boost | Ctrl+F2: Musique</div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome screen when game is locked */}
      {!boostState.gameUnlocked && !boostState.showTerms && (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
          <div className="text-center space-y-8">
            <h1 className="text-8xl font-black text-yellow-400 tracking-wider">
              🎰 FREE ROBUX
            </h1>
            <div className="text-2xl text-gray-300 space-y-4">
              <div>Appuyez sur <span className="text-red-400 font-bold">Ctrl+1</span></div>
              <div>pour commencer à jouer</div>
            </div>
            <div className="text-lg text-gray-500">
              ⚠️ Lecture des règlements obligatoire
            </div>
          </div>
        </div>
      )}

      {/* Popups */}
      <RobloxPopup
        isOpen={showRobloxPopup}
        robuxAmount={robuxWon}
        onClose={handleRobloxClose}
        onSubmit={handleRobloxSubmit}
      />

      <SuccessPopup isOpen={showSuccessPopup} username={submittedUsername} />

      {/* Boost System Components */}
      <BoostTimer
        isActive={boostState.isBoostActive}
        timeLeft={boostState.timeLeft}
      />

      <WarningPopup
        isVisible={boostState.showWarning}
        isBoostActive={boostState.isBoostActive}
      />

      <GamblingWarning
        isOpen={boostState.showGamblingAlert}
        onClose={() => toggleGamblingAlert()}
      />
    </>
  );
}
