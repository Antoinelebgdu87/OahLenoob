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
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = Math.floor(Math.random() * 100) + 1;
    setDiceResult(result);
    
    const won = (rollType === "over" && result > prediction) || 
                 (rollType === "under" && result < prediction);
    
    if (won) {
      // Calculate payout based on odds
      const odds = rollType === "over" ? 
        (100 / (100 - prediction)) : 
        (100 / prediction);
      
      const baseWin = Math.floor(5 * odds);
      const boostMultiplier = isBoostActive ? 1.2 : 1;
      const finalWin = Math.floor(baseWin * boostMultiplier);
      
      setLastWin(finalWin);
      onWin(finalWin);
    }
    
    setIsRolling(false);
  };

  const getWinChance = () => {
    return rollType === "over" ? (100 - prediction) : prediction;
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <Card className="p-8 bg-gradient-to-br from-blue-900/20 via-card to-blue-900/20 border-2 border-blue-500">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-blue-400">DICE GAME</h2>
          
          <div className="space-y-4">
            <div className="text-6xl font-mono text-center">
              {isRolling ? (
                <span className="animate-pulse text-blue-400">
                  ???
                </span>
              ) : diceResult ? (
                <span className={cn(
                  "text-white",
                  lastWin ? "text-green-500" : "text-red-500"
                )}>
                  {diceResult}
                </span>
              ) : (
                <span className="text-gray-500">--</span>
              )}
            </div>
            
            {lastWin && (
              <div className="text-xl text-green-500 font-bold">
                Gagné {lastWin} R$!
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={rollType === "over" ? "default" : "outline"}
                onClick={() => setRollType("over")}
                className="flex-1"
              >
                PLUS QUE
              </Button>
              <Button
                variant={rollType === "under" ? "default" : "outline"}
                onClick={() => setRollType("under")}
                className="flex-1"
              >
                MOINS QUE
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Nombre de prédiction: {prediction}
              </label>
              <Input
                type="range"
                min="1"
                max="99"
                value={prediction}
                onChange={(e) => setPrediction(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div className="text-sm text-gray-300">
              <p>Chance de gagner: {getWinChance()}%</p>
              <p>Multiplicateur: x{(100 / getWinChance()).toFixed(2)}</p>
              {isBoostActive && (
                <p className="text-green-400">Mode boost actif: +20% gains</p>
              )}
            </div>
          </div>

          <Button
            onClick={rollDice}
            disabled={isRolling}
            className={cn(
              "px-8 py-3 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl",
              isRolling && "opacity-75 cursor-not-allowed"
            )}
          >
            {isRolling ? "LANCEMENT..." : "LANCER LE DÉ"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
