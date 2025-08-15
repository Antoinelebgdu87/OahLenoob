import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SlotMachineProps {
  onWin: (amount: number) => void;
  isBoostActive?: boolean;
  className?: string;
}

const SLOT_SYMBOLS = ["A", "K", "Q", "J", "★", "♠", "7"];
const ROBUX_PAYOUTS = {
  "AAA": 5,
  "KKK": 10,
  "QQQ": 15,
  "JJJ": 25,
  "★★★": 50,
  "♠♠♠": 75,
  "777": 100,
};

export function SlotMachine({
  onWin,
  isBoostActive = false,
  className,
}: SlotMachineProps) {
  const [reels, setReels] = useState(["A", "A", "A"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const getRandomSymbol = () => {
    if (isBoostActive) {
      // Higher chance for better symbols when boost is active
      const boostedSymbols = ["★", "♠", "7"];
      if (Math.random() < 0.4) {
        return boostedSymbols[
          Math.floor(Math.random() * boostedSymbols.length)
        ];
      }
    }
    return SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
  };

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinCount((prev) => prev + 1);

    // Animate each reel stopping at different times
    const delays = [800, 1200, 1600];
    const newReels = ["", "", ""];

    delays.forEach((delay, index) => {
      setTimeout(() => {
        newReels[index] = getRandomSymbol();
        setReels([...newReels]);

        // Check for win after last reel stops
        if (index === 2) {
          setTimeout(() => {
            setIsSpinning(false);
            const combination = newReels.join("");
            const payout =
              ROBUX_PAYOUTS[combination as keyof typeof ROBUX_PAYOUTS];

            if (payout) {
              onWin(payout);
            } else {
              // Small consolation prize sometimes
              if (Math.random() < 0.1) {
                onWin(2);
              }
            }
          }, 300);
        }
      }, delay);
    });
  };

  return (
    <div className={cn("flex flex-col items-center space-y-6 max-w-4xl mx-auto", className)}>
      {/* Instructions Panel */}
      {spinCount === 0 && (
        <Card className="w-full p-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-400">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-yellow-300">COMMENT JOUER AUX MACHINES À SOUS</h3>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-yellow-400 font-bold mb-2">ÉTAPE 1</div>
                <div className="text-gray-300">Appuyez sur le bouton "SPIN"</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-yellow-400 font-bold mb-2">ÉTAPE 2</div>
                <div className="text-gray-300">3 symboles apparaissent dans les rouleaux</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-yellow-400 font-bold mb-2">ÉTAPE 3</div>
                <div className="text-gray-300">3 symboles identiques = JACKPOT !</div>
              </div>
            </div>
            <div className="bg-green-900/30 p-3 rounded-lg border border-green-500">
              <div className="text-green-400 font-bold">🍀 CHANCE</div>
              <div className="text-green-300">Plus le symbole est rare, plus les gains sont élevés !</div>
            </div>
          </div>
        </Card>
      )}

      {/* Slot Machine Frame */}
      <div
        className={cn(
          "bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-3xl shadow-2xl transform transition-all duration-300",
          isBoostActive && "animate-glow-pulse ring-4 ring-green-400 scale-105",
        )}
      >
        <div className="bg-gray-900 rounded-2xl p-8">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-4xl font-bold text-yellow-400 mb-2">
              MACHINES À SOUS
            </h2>
            <div className="text-lg text-gray-400">Alignez 3 symboles identiques pour gagner !</div>
            {isBoostActive && (
              <div className="text-green-400 text-sm font-bold animate-pulse mt-2">
                🚀 MODE BOOST ACTIF - Meilleurs symboles !
              </div>
            )}
          </div>

          {/* Reels */}
          <div className="flex justify-center space-x-4 mb-8">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={cn(
                  "w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-5xl shadow-2xl border-4 border-gray-300 transform transition-all duration-300",
                  isSpinning && "animate-bounce",
                )}
                style={{
                  animationDelay: isSpinning ? `${index * 0.1}s` : '0s'
                }}
              >
                {isSpinning ? (
                  <span className="animate-spin text-gray-400">⚡</span>
                ) : (
                  <span className="font-bold">{symbol}</span>
                )}
              </div>
            ))}
          </div>

          {/* Current Result */}
          {!isSpinning && spinCount > 0 && (
            <div className="text-center mb-6">
              {reels[0] === reels[1] && reels[1] === reels[2] ? (
                <div className="text-3xl text-green-500 font-bold animate-bounce">
                  🎉 JACKPOT ! 🎉
                </div>
              ) : (
                <div className="text-lg text-gray-400">
                  Essayez encore !
                </div>
              )}
            </div>
          )}

          {/* Paytable */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="text-yellow-400 text-lg font-bold text-center mb-4">
              💰 TABLEAU DES GAINS
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
              <div className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                <span className="font-mono">A A A</span>
                <span className="text-green-400 font-bold">5 R$</span>
              </div>
              <div className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                <span className="font-mono">K K K</span>
                <span className="text-green-400 font-bold">10 R$</span>
              </div>
              <div className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                <span className="font-mono">Q Q Q</span>
                <span className="text-green-400 font-bold">15 R$</span>
              </div>
              <div className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                <span className="font-mono">J J J</span>
                <span className="text-blue-400 font-bold">25 R$</span>
              </div>
              <div className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                <span className="font-mono">★ ★ ★</span>
                <span className="text-purple-400 font-bold">50 R$</span>
              </div>
              <div className="flex justify-between items-center bg-gray-700/50 p-2 rounded">
                <span className="font-mono">♠ ♠ ♠</span>
                <span className="text-red-400 font-bold">75 R$</span>
              </div>
              <div className="col-span-2 bg-yellow-900/50 p-3 rounded-lg border-2 border-yellow-400">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-yellow-400 text-lg">7 7 7</span>
                  <span className="text-yellow-400 text-xl font-bold">100 R$ JACKPOT 🎰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={spin}
            disabled={isSpinning}
            className={cn(
              "w-full py-5 text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg rounded-2xl transition-all duration-200 transform hover:scale-105",
              isSpinning && "opacity-75 cursor-not-allowed scale-95",
            )}
          >
            {isSpinning ? "🎰 SPINNING..." : "🎯 SPIN TO WIN"}
          </Button>

          {/* Game Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-center">
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-gray-400 text-sm">Tours joués</div>
              <div className="text-white text-xl font-bold">{spinCount}</div>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg">
              <div className="text-gray-400 text-sm">Prochaine chance</div>
              <div className="text-yellow-400 text-xl font-bold">MAINTENANT !</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
