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
      // Generate random crash point between 2x and 10x (plus facile)
      const crash = Math.random() * 8 + 2;
      setCrashPoint(crash);

      interval = setInterval(() => {
        setMultiplier(prev => {
          const next = prev + 0.005; // Plus lent (0.005 au lieu de 0.01)
          if (next >= crash) {
            setIsPlaying(false);
            setHasWon(false);
            return crash;
          }
          return next;
        });
      }, 100); // Plus lent (100ms au lieu de 50ms)
    }

    return () => clearInterval(interval);
  }, [isPlaying, hasWon]);

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
    <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto">
      <Card className="w-full p-4 bg-gradient-to-br from-purple-900/20 via-card to-purple-900/20 border-2 border-purple-500">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-purple-400">CRASH GAME</h2>

          {/* Game Display */}
          <div className="bg-black/30 p-4 rounded-lg border border-purple-400">
            <div className="text-4xl font-mono text-center mb-2">
              <span className={cn(
                "text-white transition-colors duration-200",
                multiplier >= crashPoint && isPlaying && "text-red-500 animate-pulse"
              )}>
                {multiplier.toFixed(2)}x
              </span>
            </div>

            {/* Status Messages */}
            {multiplier >= crashPoint && !hasWon && isPlaying && (
              <div className="text-xl text-red-500 font-bold">
                CRASHED!
              </div>
            )}

            {hasWon && (
              <div className="text-xl text-green-500 font-bold">
                ENCAISSÉ AVEC SUCCÈS!
              </div>
            )}

            {isPlaying && multiplier < crashPoint && (
              <div className="text-yellow-400 text-sm">
                Encaissez maintenant !
              </div>
            )}
          </div>

          {/* Potential Winnings Display */}
          {isPlaying && (
            <div className="bg-green-900/30 p-2 rounded border border-green-500 text-sm">
              <span className="text-green-400 font-bold">
                Gains potentiels : {Math.floor(multiplier * 5 * (isBoostActive ? 1.5 : 1))} R$
              </span>
            </div>
          )}

          {/* Game Info */}
          <div className="bg-gray-800/50 p-3 rounded text-xs text-gray-300">
            <div className="flex justify-between">
              <span>Mise: 5 R$</span>
              <span>Max: x20</span>
              {isBoostActive && <span className="text-green-400">Boost +50%</span>}
            </div>
          </div>

          {/* Game Controls */}
          <div className="space-y-2">
            {!isPlaying ? (
              <Button
                onClick={startGame}
                className="w-full py-3 text-lg font-bold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg"
              >
                DÉMARRER LE JEU
              </Button>
            ) : (
              <Button
                onClick={cashOut}
                disabled={multiplier >= crashPoint}
                className={cn(
                  "w-full py-3 text-lg font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg",
                  multiplier >= crashPoint ? "opacity-50 cursor-not-allowed" : "animate-pulse"
                )}
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
