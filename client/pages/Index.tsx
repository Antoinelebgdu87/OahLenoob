import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RouletteWheel } from "@/components/RouletteWheel";
import { SlotMachine } from "@/components/SlotMachine";
import { CrashGame } from "@/components/CrashGame";
import { DiceGame } from "@/components/DiceGame";
import { NyanCatGame } from "@/components/NyanCatGame";
import { GameSelector } from "@/components/GameSelector";
import { RobloxPopup } from "@/components/RobloxPopup";
import { SuccessPopup } from "@/components/SuccessPopup";
import { BoostTimer } from "@/components/BoostTimer";
import { BetModal } from "@/components/BetModal";
import { GameHistory, GameHistoryEntry } from "@/components/GameHistory";
import { useBoost } from "@/hooks/use-boost";
import { cn } from "@/lib/utils";

export default function Index() {
  const [selectedGame, setSelectedGame] = useState<"roulette" | "slots" | "crash" | "dice" | "nyancat" | null>(
    null,
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [showRobloxPopup, setShowRobloxPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [robuxWon, setRobuxWon] = useState<number>(0);
  const [submittedUsername, setSubmittedUsername] = useState<string>("");

  // Betting system
  const [showBetModal, setShowBetModal] = useState(false);
  const [currentBet, setCurrentBet] = useState<{ playerName: string; amount: number } | null>(null);
  const [gameHistory, setGameHistory] = useState<GameHistoryEntry[]>([]);

  const { boostState } = useBoost();

  const handleGameSelect = (game: "roulette" | "slots" | "crash" | "dice" | "nyancat") => {
    setSelectedGame(game);
  };

  const handleBackToMenu = () => {
    setSelectedGame(null);
    setIsSpinning(false);
  };

  const handleSpin = () => {
    if (!isSpinning && !currentBet) {
      setShowBetModal(true);
    } else if (currentBet) {
      setIsSpinning(true);
    }
  };

  const handleSpinComplete = (robuxAmount: number) => {
    setIsSpinning(false);
    setRobuxWon(robuxAmount);

    // Add to history
    if (currentBet && selectedGame) {
      const historyEntry: GameHistoryEntry = {
        id: Date.now().toString(),
        playerName: currentBet.playerName,
        game: selectedGame,
        bet: currentBet.amount,
        result: robuxAmount > 0 ? "won" : "lost",
        winnings: robuxAmount,
        timestamp: new Date(),
      };
      setGameHistory(prev => [...prev, historyEntry]);
    }

    setShowRobloxPopup(true);
  };

  const handleSlotWin = (robuxAmount: number) => {
    // Add to history
    if (currentBet && selectedGame) {
      const historyEntry: GameHistoryEntry = {
        id: Date.now().toString(),
        playerName: currentBet.playerName,
        game: selectedGame,
        bet: currentBet.amount,
        result: robuxAmount > 0 ? "won" : "lost",
        winnings: robuxAmount,
        timestamp: new Date(),
      };
      setGameHistory(prev => [...prev, historyEntry]);
    }

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
          <div className="flex flex-col items-center justify-center space-y-6 max-w-4xl mx-auto px-4">
            {/* Back Button */}
            <Button
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              ← Retour au menu
            </Button>

            {/* Title */}
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 tracking-wider">
              ROULETTE ROBUX
            </h1>

            {/* Game Area */}
            <div className="space-y-4">
              {/* Roulette */}
              <div className="flex justify-center">
                <div className="scale-75">
                  <RouletteWheel
                    onSpinComplete={handleSpinComplete}
                    isSpinning={isSpinning}
                    isBoostActive={boostState.isBoostActive}
                  />
                </div>
              </div>

              {/* Prize Information */}
              {!isSpinning && (
                <div className="bg-gray-800/50 p-3 rounded-lg max-w-xl mx-auto">
                  <h4 className="text-yellow-400 font-bold text-center mb-2 text-sm">PRIX DISPONIBLES</h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-red-900/50 p-2 rounded">
                      <div className="text-white font-bold">2 R$</div>
                      <div className="text-gray-400">Commun</div>
                    </div>
                    <div className="bg-blue-900/50 p-2 rounded">
                      <div className="text-white font-bold">5 R$</div>
                      <div className="text-gray-400">Fréquent</div>
                    </div>
                    <div className="bg-purple-900/50 p-2 rounded">
                      <div className="text-white font-bold">25-50 R$</div>
                      <div className="text-gray-400">Rare</div>
                    </div>
                    <div className="bg-yellow-900/50 p-2 rounded">
                      <div className="text-yellow-400 font-bold">100 R$</div>
                      <div className="text-gray-400">JACKPOT</div>
                    </div>
                  </div>
                  {boostState.isBoostActive && (
                    <div className="bg-green-900/30 p-2 rounded mt-2 text-center">
                      <div className="text-green-400 text-xs font-bold">MODE BOOST ACTIF - 80% chance de gagner 5-10 R$</div>
                    </div>
                  )}
                </div>
              )}

              {/* Spin Button */}
              <div className="text-center">
                <Button
                  className={cn(
                    "px-8 py-3 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg rounded-lg transition-all duration-200",
                    isSpinning && "opacity-75 cursor-not-allowed",
                  )}
                  onClick={handleSpin}
                  disabled={isSpinning}
                >
                  {isSpinning ? "SPINNING..." : "FAIRE TOURNER LA ROUE"}
                </Button>

                {isSpinning && (
                  <div className="mt-2 text-yellow-400 text-sm">
                    La roue tourne... Bonne chance !
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

        {/* Nyan Cat Game */}
        {selectedGame === "nyancat" && (
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Back Button */}
            <Button
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              ← Retour au menu
            </Button>

            {/* Title */}
            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 tracking-wider">
              NYAN CAT GAME
            </h1>

            {/* Nyan Cat Game */}
            <NyanCatGame
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
