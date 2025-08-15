import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DiceGameProps {
  onWin: (robuxAmount: number) => void;
  isBoostActive: boolean;
}

export function DiceGame({ onWin, isBoostActive }: DiceGameProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [prediction, setPrediction] = useState(50);
  const [rollType, setRollType] = useState<"over" | "under">("over");
  const [lastWin, setLastWin] = useState<number | null>(null);

  const rollDice = async () => {
    setIsRolling(true);
    setLastWin(null);

    // Simulate rolling animation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = Math.floor(Math.random() * 100) + 1;
    setDiceResult(result);

    const won =
      (rollType === "over" && result > prediction) ||
      (rollType === "under" && result < prediction);

    if (won) {
      // Calculate payout based on odds
      const odds =
        rollType === "over" ? 100 / (100 - prediction) : 100 / prediction;

      const baseWin = Math.floor(5 * odds);
      const boostMultiplier = isBoostActive ? 1.2 : 1;
      const finalWin = Math.floor(baseWin * boostMultiplier);

      setLastWin(finalWin);
      onWin(finalWin);
    }

    setIsRolling(false);
  };

  const getWinChance = () => {
    return rollType === "over" ? 100 - prediction : prediction;
  };

  return (
    <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto">
      <Card className="w-full p-4 bg-gradient-to-br from-blue-900/20 via-card to-blue-900/20 border-2 border-blue-500">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-blue-400">DICE GAME</h2>

          {/* Game Display */}
          <div className="bg-black/30 p-4 rounded-lg border border-blue-400">
            <div className="text-4xl font-mono text-center mb-2">
              {isRolling ? (
                <span className="animate-pulse text-blue-400">???</span>
              ) : diceResult ? (
                <span
                  className={cn(
                    "text-white transition-colors duration-500",
                    lastWin ? "text-green-500" : "text-red-500",
                  )}
                >
                  {diceResult}
                </span>
              ) : (
                <span className="text-gray-500">--</span>
              )}
            </div>

            {/* Result Messages */}
            {lastWin && (
              <div className="text-lg text-green-500 font-bold mb-1">
                GAGNÉ {lastWin} R$ !
              </div>
            )}

            {diceResult && !lastWin && (
              <div className="text-lg text-red-500 font-bold mb-1">
                Perdu cette fois...
              </div>
            )}

            {/* Current Prediction Display */}
            {!isRolling && (
              <div className="text-sm text-blue-400">
                Le dé sera {rollType === "over" ? "PLUS" : "MOINS"} que{" "}
                {prediction}
              </div>
            )}
          </div>

          {/* Game Controls */}
          <div className="space-y-3">
            {/* Prediction Type */}
            <div className="flex gap-2">
              <Button
                variant={rollType === "over" ? "default" : "outline"}
                onClick={() => setRollType("over")}
                className="flex-1 py-2 text-sm"
                disabled={isRolling}
              >
                PLUS QUE {prediction}
              </Button>
              <Button
                variant={rollType === "under" ? "default" : "outline"}
                onClick={() => setRollType("under")}
                className="flex-1 py-2 text-sm"
                disabled={isRolling}
              >
                MOINS QUE {prediction}
              </Button>
            </div>

            {/* Number Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-blue-300">
                Votre nombre : {prediction}
              </label>
              <div className="bg-gray-800/50 p-3 rounded">
                <Input
                  type="range"
                  min="1"
                  max="99"
                  value={prediction}
                  onChange={(e) => setPrediction(Number(e.target.value))}
                  className="w-full h-2 mb-2"
                  disabled={isRolling}
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1</span>
                  <span className="text-blue-400 font-bold">{prediction}</span>
                  <span>99</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-800/50 p-3 rounded text-xs">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-blue-400">Chance</div>
                  <div className="text-white font-bold">{getWinChance()}%</div>
                </div>
                <div>
                  <div className="text-blue-400">Multi</div>
                  <div className="text-yellow-400 font-bold">
                    x{(100 / getWinChance()).toFixed(1)}
                  </div>
                </div>
                <div>
                  <div className="text-blue-400">Gains</div>
                  <div className="text-green-400 font-bold">
                    {Math.floor(
                      5 * (100 / getWinChance()) * (isBoostActive ? 1.2 : 1),
                    )}{" "}
                    R$
                  </div>
                </div>
              </div>
              {isBoostActive && (
                <div className="text-center mt-2 text-green-400 text-xs">
                  Mode boost actif : +20% gains
                </div>
              )}
            </div>
          </div>

          {/* Launch Button */}
          <Button
            onClick={rollDice}
            disabled={isRolling}
            className={cn(
              "w-full py-3 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg",
              isRolling && "opacity-75 cursor-not-allowed",
            )}
          >
            {isRolling ? "LANCEMENT..." : "LANCER LE DÉ"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
