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
    <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
      {/* Instructions Panel */}
      {!isPlaying && (
        <Card className="w-full p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-2 border-purple-400">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-purple-300">COMMENT JOUER AU CRASH</h3>
            <div className="grid md:grid-cols-3 gap-4 text-left">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-purple-400 font-bold mb-2">ÉTAPE 1</div>
                <div className="text-gray-300">Cliquez sur "DÉMARRER" pour lancer le multiplicateur</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-purple-400 font-bold mb-2">ÉTAPE 2</div>
                <div className="text-gray-300">Le multiplicateur monte : 1.1x → 1.5x → 2x → ...</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-purple-400 font-bold mb-2">ÉTAPE 3</div>
                <div className="text-gray-300">Cliquez "ENCAISSER" AVANT le crash pour gagner !</div>
              </div>
            </div>
            <div className="bg-red-900/30 p-3 rounded-lg border border-red-500">
              <div className="text-red-400 font-bold">⚠️ ATTENTION</div>
              <div className="text-red-300">Si vous n'encaissez pas avant le crash, vous perdez tout !</div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-8 bg-gradient-to-br from-purple-900/20 via-card to-purple-900/20 border-2 border-purple-500 shadow-2xl">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-purple-400">CRASH GAME</h2>

          {/* Game Display */}
          <div className="space-y-4">
            <div className="bg-black/30 p-8 rounded-xl border border-purple-400">
              <div className="text-8xl font-mono text-center mb-4">
                <span className={cn(
                  "text-white transition-colors duration-200",
                  multiplier >= crashPoint && isPlaying && "text-red-500 animate-pulse"
                )}>
                  {multiplier.toFixed(2)}x
                </span>
              </div>

              {/* Status Messages */}
              {multiplier >= crashPoint && !hasWon && isPlaying && (
                <div className="text-3xl text-red-500 font-bold animate-bounce">
                  💥 CRASHED!
                </div>
              )}

              {hasWon && (
                <div className="text-3xl text-green-500 font-bold animate-pulse">
                  ✅ ENCAISSÉ AVEC SUCCÈS!
                </div>
              )}

              {isPlaying && multiplier < crashPoint && (
                <div className="text-yellow-400 text-lg animate-pulse">
                  Multiplicateur en cours... Encaissez maintenant !
                </div>
              )}
            </div>

            {/* Potential Winnings Display */}
            {isPlaying && (
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500">
                <div className="text-green-400 text-xl font-bold">
                  Gains potentiels : {Math.floor(multiplier * 5 * (isBoostActive ? 1.5 : 1))} R$
                </div>
              </div>
            )}
          </div>

          {/* Game Info */}
          <div className="bg-gray-800/50 p-4 rounded-lg text-sm text-gray-300">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-purple-400 font-semibold">Mise de base :</span> 5 R$
              </div>
              <div>
                <span className="text-purple-400 font-semibold">Multiplicateur max :</span> x20
              </div>
              {isBoostActive && (
                <div className="col-span-2">
                  <span className="text-green-400 font-semibold">Mode boost actif : +50% gains</span>
                </div>
              )}
            </div>
          </div>

          {/* Game Controls */}
          <div className="flex gap-4">
            {!isPlaying ? (
              <Button
                onClick={startGame}
                className="flex-1 py-4 text-xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
              >
                🚀 DÉMARRER LE JEU
              </Button>
            ) : (
              <Button
                onClick={cashOut}
                disabled={multiplier >= crashPoint}
                className={cn(
                  "flex-1 py-4 text-xl font-bold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-lg",
                  multiplier >= crashPoint ? "opacity-50 cursor-not-allowed" : "animate-pulse"
                )}
              >
                💰 ENCAISSER MAINTENANT
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
