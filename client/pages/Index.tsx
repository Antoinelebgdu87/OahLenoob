import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RouletteWheel } from "@/components/RouletteWheel";
import { SlotMachine } from "@/components/SlotMachine";
import { CrashGame } from "@/components/CrashGame";
import { DiceGame } from "@/components/DiceGame";
import { GameSelector } from "@/components/GameSelector";
import { RobloxPopup } from "@/components/RobloxPopup";
import { SuccessPopup } from "@/components/SuccessPopup";
import { BoostTimer } from "@/components/BoostTimer";
import { useBoost } from "@/hooks/use-boost";
import { cn } from "@/lib/utils";

export default function Index() {
  const [selectedGame, setSelectedGame] = useState<"roulette" | "slots" | "crash" | "dice" | null>(
    null,
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [showRobloxPopup, setShowRobloxPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [robuxWon, setRobuxWon] = useState<number>(0);
  const [submittedUsername, setSubmittedUsername] = useState<string>("");

  const { boostState } = useBoost();

  const handleGameSelect = (game: "roulette" | "slots" | "crash" | "dice") => {
    setSelectedGame(game);
  };

  const handleBackToMenu = () => {
    setSelectedGame(null);
    setIsSpinning(false);
  };

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

  const handleSlotWin = (robuxAmount: number) => {
    if (robuxAmount > 0) {
      setRobuxWon(robuxAmount);
      setShowRobloxPopup(true);
    }
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
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        {/* Game Selection Screen */}
        {!selectedGame && <GameSelector onSelectGame={handleGameSelect} />}

        {/* Roulette Game */}
        {selectedGame === "roulette" && (
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Back Button */}
            <Button
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              ← Retour au menu
            </Button>

            {/* Title */}
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 tracking-wider">
              ROULETTE ROBUX
            </h1>

            {/* Roulette */}
            <RouletteWheel
              onSpinComplete={handleSpinComplete}
              isSpinning={isSpinning}
              isBoostActive={boostState.isBoostActive}
            />

            {/* Spin Button */}
            <Button
              className={cn(
                "px-8 py-3 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg rounded-xl transition-all duration-200 hover:shadow-xl tracking-wide uppercase",
                isSpinning && "opacity-75 cursor-not-allowed",
              )}
              onClick={handleSpin}
              disabled={isSpinning}
            >
              {isSpinning ? "Spinning..." : "Faire tourner la roue"}
            </Button>
          </div>
        )}

        {/* Slot Machine Game */}
        {selectedGame === "slots" && (
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Back Button */}
            <Button
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              ← Retour au menu
            </Button>

            {/* Title */}
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 tracking-wider">
              MACHINES À SOUS
            </h1>

            {/* Slot Machine */}
            <SlotMachine
              onWin={handleSlotWin}
              isBoostActive={boostState.isBoostActive}
            />
          </div>
        )}
      </div>

      {/* Popups */}
      <RobloxPopup
        isOpen={showRobloxPopup}
        robuxAmount={robuxWon}
        onClose={handleRobloxClose}
        onSubmit={handleRobloxSubmit}
      />

      <SuccessPopup isOpen={showSuccessPopup} username={submittedUsername} />

      {/* Boost Timer */}
      <BoostTimer
        isActive={boostState.isBoostActive}
        timeLeft={boostState.timeLeft}
      />
    </>
  );
}
