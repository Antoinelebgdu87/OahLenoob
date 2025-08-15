import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CrashGameProps {
  onWin: (robuxAmount: number) => void;
  isBoostActive: boolean;
}

export function CrashGame({ onWin, isBoostActive }: CrashGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [multiplier, setMultiplier] = useState(1.0);
  const [hasWon, setHasWon] = useState(false);
  const [crashPoint, setCrashPoint] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && !hasWon) {
      // Generate random crash point between 1.1x and 20x
      const crash = Math.random() * 19 + 1.1;
      setCrashPoint(crash);
      
      interval = setInterval(() => {
        setMultiplier(prev => {
          const next = prev + 0.01;
          if (next >= crash) {
            setIsPlaying(false);
            setHasWon(false);
            return crash;
          }
          return next;
        });
      }, 50);
    }

    return () => clearInterval(interval);
  }, [isPlaying, hasWon, crashPoint]);

  const startGame = () => {
    setIsPlaying(true);
    setHasWon(false);
    setMultiplier(1.0);
  };

  const cashOut = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setHasWon(true);
      
      const baseWin = Math.floor(multiplier * 5);
      const boostMultiplier = isBoostActive ? 1.5 : 1;
      const finalWin = Math.floor(baseWin * boostMultiplier);
      
      onWin(finalWin);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <Card className="p-8 bg-gradient-to-br from-purple-900/20 via-card to-purple-900/20 border-2 border-purple-500">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">CRASH GAME</h2>
          
          <div className="space-y-4">
            <div className="text-6xl font-mono text-center">
              <span className={cn(
                "text-white",
                multiplier >= crashPoint && isPlaying && "text-red-500"
              )}>
                {multiplier.toFixed(2)}x
              </span>
            </div>
            
            {multiplier >= crashPoint && !hasWon && (
              <div className="text-2xl text-red-500 font-bold animate-pulse">
                CRASHED!
              </div>
            )}
            
            {hasWon && (
              <div className="text-2xl text-green-500 font-bold">
                CASHED OUT!
              </div>
            )}
          </div>

          <div className="text-sm text-gray-300">
            <p>Multiplicateur de base: x5 R$</p>
            {isBoostActive && (
              <p className="text-green-400">Mode boost actif: x1.5 gains</p>
            )}
          </div>

          <div className="flex gap-4">
            {!isPlaying ? (
              <Button
                onClick={startGame}
                className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl"
              >
                DÉMARRER LE JEU
              </Button>
            ) : (
              <Button
                onClick={cashOut}
                className="px-8 py-3 text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl animate-pulse"
              >
                ENCAISSER MAINTENANT
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
