import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SlotMachineProps {
  onWin: (amount: number) => void;
  isBoostActive?: boolean;
  className?: string;
}

const SLOT_SYMBOLS = ["🍒", "🍋", "🔔", "⭐", "💎", "🍀", "7️⃣"];
const ROBUX_PAYOUTS = {
  "🍒🍒🍒": 5,
  "🍋🍋🍋": 10,
  "🔔🔔🔔": 15,
  "⭐⭐⭐": 25,
  "💎💎💎": 50,
  "🍀🍀🍀": 75,
  "7️⃣7️⃣7️⃣": 100,
};

export function SlotMachine({ onWin, isBoostActive = false, className }: SlotMachineProps) {
  const [reels, setReels] = useState(["🍒", "🍒", "🍒"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const getRandomSymbol = () => {
    if (isBoostActive) {
      // Higher chance for better symbols when boost is active
      const boostedSymbols = ["⭐", "💎", "🍀", "7️⃣"];
      if (Math.random() < 0.4) {
        return boostedSymbols[Math.floor(Math.random() * boostedSymbols.length)];
      }
    }
    return SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
  };

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setSpinCount(prev => prev + 1);
    
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
            const payout = ROBUX_PAYOUTS[combination as keyof typeof ROBUX_PAYOUTS];
            
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
    <div className={cn("flex flex-col items-center space-y-6", className)}>
      {/* Slot Machine Frame */}
      <div className={cn(
        "bg-gradient-to-br from-yellow-400 to-yellow-600 p-6 rounded-2xl shadow-2xl",
        isBoostActive && "animate-glow-pulse ring-4 ring-green-400"
      )}>
        <div className="bg-gray-900 rounded-xl p-6">
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-yellow-400">🎰 SLOT MACHINE</h2>
            <div className="text-sm text-gray-400">Match 3 symbols to win!</div>
          </div>
          
          {/* Reels */}
          <div className="flex justify-center space-x-2 mb-6">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={cn(
                  "w-20 h-20 bg-white rounded-lg flex items-center justify-center text-4xl shadow-inner border-4 border-gray-300",
                  isSpinning && "animate-spin"
                )}
              >
                {isSpinning ? "?" : symbol}
              </div>
            ))}
          </div>
          
          {/* Paytable */}
          <div className="bg-gray-800 rounded-lg p-3 mb-4">
            <div className="text-yellow-400 text-xs font-bold text-center mb-2">PAYOUTS</div>
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-300">
              <div>🍒🍒🍒 = 5 R$</div>
              <div>🍋🍋🍋 = 10 R$</div>
              <div>🔔🔔🔔 = 15 R$</div>
              <div>⭐⭐⭐ = 25 R$</div>
              <div>💎💎💎 = 50 R$</div>
              <div>🍀🍀🍀 = 75 R$</div>
              <div className="col-span-2 text-center text-yellow-400 font-bold">
                7️⃣7️⃣7️⃣ = 100 R$ 🎉
              </div>
            </div>
          </div>
          
          {/* Spin Button */}
          <Button
            onClick={spin}
            disabled={isSpinning}
            className={cn(
              "w-full py-3 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg rounded-xl transition-all duration-200",
              isSpinning && "opacity-75 cursor-not-allowed"
            )}
          >
            {isSpinning ? "SPINNING..." : "🎯 SPIN TO WIN"}
          </Button>
          
          {/* Spin Counter */}
          <div className="text-center mt-3 text-gray-400 text-sm">
            Spins: {spinCount}
          </div>
        </div>
      </div>
    </div>
  );
}
