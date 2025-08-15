import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className={cn("flex flex-col items-center space-y-4 max-w-2xl mx-auto", className)}>
      {/* Slot Machine Frame */}
      <div
        className={cn(
          "bg-gradient-to-br from-yellow-400 to-yellow-600 p-4 rounded-2xl shadow-xl",
          isBoostActive && "ring-2 ring-green-400",
        )}
      >
        <div className="bg-gray-900 rounded-xl p-4">
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-yellow-400 mb-1">
              MACHINES À SOUS
            </h2>
            <div className="text-sm text-gray-400">Alignez 3 symboles identiques</div>
            {isBoostActive && (
              <div className="text-green-400 text-xs font-bold mt-1">
                MODE BOOST ACTIF
              </div>
            )}
          </div>

          {/* Reels */}
          <div className="flex justify-center space-x-3 mb-4">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={cn(
                  "w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl shadow-lg border-2 border-gray-300",
                  isSpinning && "animate-pulse",
                )}
              >
                {isSpinning ? (
                  <span className="text-gray-400">?</span>
                ) : (
                  <span className="font-bold">{symbol}</span>
                )}
              </div>
            ))}
          </div>

          {/* Current Result */}
          {!isSpinning && spinCount > 0 && (
            <div className="text-center mb-3">
              {reels[0] === reels[1] && reels[1] === reels[2] ? (
                <div className="text-xl text-green-500 font-bold">
                  JACKPOT !
                </div>
              ) : (
                <div className="text-sm text-gray-400">
                  Essayez encore !
                </div>
              )}
            </div>
          )}

          {/* Paytable */}
          <div className="bg-gray-800 rounded-lg p-3 mb-4">
            <div className="text-yellow-400 text-sm font-bold text-center mb-2">
              TABLEAU DES GAINS
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
              <div className="flex justify-between bg-gray-700/50 p-1 rounded">
                <span>A A A</span>
                <span className="text-green-400">5 R$</span>
              </div>
              <div className="flex justify-between bg-gray-700/50 p-1 rounded">
                <span>K K K</span>
                <span className="text-green-400">10 R$</span>
              </div>
              <div className="flex justify-between bg-gray-700/50 p-1 rounded">
                <span>Q Q Q</span>
                <span className="text-green-400">15 R$</span>
              </div>
              <div className="flex justify-between bg-gray-700/50 p-1 rounded">
                <span>J J J</span>
                <span className="text-blue-400">25 R$</span>
              </div>
              <div className="flex justify-between bg-gray-700/50 p-1 rounded">
                <span>★ ★ ★</span>
                <span className="text-purple-400">50 R$</span>
              </div>
              <div className="flex justify-between bg-gray-700/50 p-1 rounded">
                <span>♠ ♠ ♠</span>
                <span className="text-red-400">75 R$</span>
              </div>
              <div className="col-span-2 bg-yellow-900/50 p-2 rounded border border-yellow-400">
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400">7 7 7</span>
                  <span className="text-yellow-400 font-bold">100 R$ JACKPOT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Spin Button */}
          <Button
            onClick={spin}
            disabled={isSpinning}
            className={cn(
              "w-full py-3 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg rounded-lg",
              isSpinning && "opacity-75 cursor-not-allowed",
            )}
          >
            {isSpinning ? "SPINNING..." : "SPIN TO WIN"}
          </Button>

          {/* Game Stats */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-center text-xs">
            <div className="bg-gray-800/50 p-2 rounded">
              <div className="text-gray-400">Tours</div>
              <div className="text-white font-bold">{spinCount}</div>
            </div>
            <div className="bg-gray-800/50 p-2 rounded">
              <div className="text-gray-400">Chance</div>
              <div className="text-yellow-400 font-bold">BONNE !</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
