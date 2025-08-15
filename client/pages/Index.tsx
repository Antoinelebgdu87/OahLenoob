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
          <div className="flex flex-col items-center justify-center space-y-8 max-w-6xl mx-auto px-4">
            {/* Back Button */}
            <Button
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              ← Retour au menu
            </Button>

            {/* Instructions Panel */}
            {!isSpinning && (
              <div className="w-full max-w-4xl bg-gradient-to-r from-red-900/30 to-orange-900/30 border-2 border-red-400 rounded-2xl p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-red-300">COMMENT JOUER À LA ROULETTE</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-left">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="text-red-400 font-bold mb-2">ÉTAPE 1</div>
                      <div className="text-gray-300">Cliquez sur "Faire tourner la roue"</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="text-red-400 font-bold mb-2">ÉTAPE 2</div>
                      <div className="text-gray-300">La roue tourne et s'arrête sur un nombre</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <div className="text-red-400 font-bold mb-2">ÉTAPE 3</div>
                      <div className="text-gray-300">Vous gagnez automatiquement les R$ indiqués !</div>
                    </div>
                  </div>
                  <div className="bg-green-900/30 p-3 rounded-lg border border-green-500">
                    <div className="text-green-400 font-bold">🎯 SIMPLE ET RAPIDE</div>
                    <div className="text-green-300">Aucune stratégie requise - juste de la chance ! Gains de 2 à 100 R$</div>
                  </div>
                  {boostState.isBoostActive && (
                    <div className="bg-yellow-900/30 p-3 rounded-lg border border-yellow-500">
                      <div className="text-yellow-400 font-bold">🚀 MODE BOOST ACTIF</div>
                      <div className="text-yellow-300">80% de chance de gagner 5-10 R$ au lieu des petits montants !</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Title */}
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 tracking-wider">
              ROULETTE ROBUX
            </h1>

            {/* Game Area */}
            <div className="space-y-6">
              {/* Roulette */}
              <div className="flex justify-center">
                <RouletteWheel
                  onSpinComplete={handleSpinComplete}
                  isSpinning={isSpinning}
                  isBoostActive={boostState.isBoostActive}
                />
              </div>

              {/* Prize Information */}
              {!isSpinning && (
                <div className="bg-gray-800/50 p-4 rounded-xl max-w-2xl mx-auto">
                  <h4 className="text-yellow-400 font-bold text-center mb-3">PRIX DISPONIBLES</h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-sm">
                    <div className="bg-red-900/50 p-2 rounded border border-red-500">
                      <div className="text-white font-bold">2 R$</div>
                      <div className="text-gray-300 text-xs">Commun</div>
                    </div>
                    <div className="bg-blue-900/50 p-2 rounded border border-blue-500">
                      <div className="text-white font-bold">5 R$</div>
                      <div className="text-gray-300 text-xs">Fréquent</div>
                    </div>
                    <div className="bg-purple-900/50 p-2 rounded border border-purple-500">
                      <div className="text-white font-bold">25-50 R$</div>
                      <div className="text-gray-300 text-xs">Rare</div>
                    </div>
                    <div className="bg-yellow-900/50 p-2 rounded border border-yellow-500">
                      <div className="text-yellow-400 font-bold">100 R$</div>
                      <div className="text-gray-300 text-xs">JACKPOT</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Spin Button */}
              <div className="text-center">
                <Button
                  className={cn(
                    "px-12 py-4 text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-2xl rounded-2xl transition-all duration-200 hover:shadow-xl tracking-wide uppercase transform hover:scale-105",
                    isSpinning && "opacity-75 cursor-not-allowed scale-95",
                  )}
                  onClick={handleSpin}
                  disabled={isSpinning}
                >
                  {isSpinning ? "🎰 SPINNING..." : "🎯 FAIRE TOURNER LA ROUE"}
                </Button>

                {isSpinning && (
                  <div className="mt-4 text-yellow-400 text-lg animate-pulse">
                    La roue tourne... Bonne chance ! 🍀
                  </div>
                )}
              </div>
            </div>
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

        {/* Crash Game */}
        {selectedGame === "crash" && (
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Back Button */}
            <Button
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              ← Retour au menu
            </Button>

            {/* Title */}
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-500 tracking-wider">
              CRASH GAME
            </h1>

            {/* Crash Game */}
            <CrashGame
              onWin={handleSlotWin}
              isBoostActive={boostState.isBoostActive}
            />
          </div>
        )}

        {/* Dice Game */}
        {selectedGame === "dice" && (
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Back Button */}
            <Button
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              ← Retour au menu
            </Button>

            {/* Title */}
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500 tracking-wider">
              DICE GAME
            </h1>

            {/* Dice Game */}
            <DiceGame
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
