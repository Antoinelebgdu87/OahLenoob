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
    <div className="flex flex-col items-center space-y-6 max-w-4xl mx-auto">
      {/* Instructions Panel */}
      {!isRolling && !diceResult && (
        <Card className="w-full p-6 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border-2 border-blue-400">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-blue-300">COMMENT JOUER AU DICE</h3>
            <div className="grid md:grid-cols-4 gap-4 text-left">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-blue-400 font-bold mb-2">ÉTAPE 1</div>
                <div className="text-gray-300">Choisissez un nombre entre 1 et 99</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-blue-400 font-bold mb-2">ÉTAPE 2</div>
                <div className="text-gray-300">Sélectionnez "PLUS QUE" ou "MOINS QUE"</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-blue-400 font-bold mb-2">ÉTAPE 3</div>
                <div className="text-gray-300">Lancez le dé (1-100)</div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="text-blue-400 font-bold mb-2">ÉTAPE 4</div>
                <div className="text-gray-300">Si votre prédiction est bonne, vous gagnez !</div>
              </div>
            </div>
            <div className="bg-yellow-900/30 p-3 rounded-lg border border-yellow-500">
              <div className="text-yellow-400 font-bold">💡 ASTUCE</div>
              <div className="text-yellow-300">Plus votre prédiction est risquée, plus vous gagnez de R$ !</div>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-8 bg-gradient-to-br from-blue-900/20 via-card to-blue-900/20 border-2 border-blue-500 shadow-2xl">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-blue-400">DICE GAME</h2>

          {/* Game Display */}
          <div className="space-y-4">
            <div className="bg-black/30 p-8 rounded-xl border border-blue-400">
              <div className="text-8xl font-mono text-center mb-4">
                {isRolling ? (
                  <span className="animate-spin text-blue-400">
                    🎲
                  </span>
                ) : diceResult ? (
                  <span className={cn(
                    "text-white transition-colors duration-500",
                    lastWin ? "text-green-500 animate-bounce" : "text-red-500"
                  )}>
                    {diceResult}
                  </span>
                ) : (
                  <span className="text-gray-500">🎲</span>
                )}
              </div>

              {/* Result Messages */}
              {lastWin && (
                <div className="text-3xl text-green-500 font-bold animate-pulse mb-2">
                  🎉 GAGNÉ {lastWin} R$ !
                </div>
              )}

              {diceResult && !lastWin && (
                <div className="text-2xl text-red-500 font-bold mb-2">
                  ❌ Perdu cette fois...
                </div>
              )}

              {/* Current Prediction Display */}
              {!isRolling && (
                <div className="text-lg text-blue-400">
                  Prédiction : Le dé sera {rollType === "over" ? "PLUS" : "MOINS"} que {prediction}
                </div>
              )}
            </div>
          </div>

          {/* Game Controls */}
          <div className="space-y-6">
            {/* Prediction Type */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-blue-300">Type de prédiction :</label>
              <div className="flex gap-3">
                <Button
                  variant={rollType === "over" ? "default" : "outline"}
                  onClick={() => setRollType("over")}
                  className="flex-1 py-3 text-lg"
                  disabled={isRolling}
                >
                  📈 PLUS QUE {prediction}
                </Button>
                <Button
                  variant={rollType === "under" ? "default" : "outline"}
                  onClick={() => setRollType("under")}
                  className="flex-1 py-3 text-lg"
                  disabled={isRolling}
                >
                  📉 MOINS QUE {prediction}
                </Button>
              </div>
            </div>

            {/* Number Selector */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-blue-300">
                Votre nombre : {prediction}
              </label>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <Input
                  type="range"
                  min="1"
                  max="99"
                  value={prediction}
                  onChange={(e) => setPrediction(Number(e.target.value))}
                  className="w-full h-3 mb-3"
                  disabled={isRolling}
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>1</span>
                  <span className="text-blue-400 font-bold">{prediction}</span>
                  <span>99</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-400 font-semibold">Chance de gagner :</span>
                  <div className="text-white text-lg font-bold">{getWinChance()}%</div>
                </div>
                <div>
                  <span className="text-blue-400 font-semibold">Multiplicateur :</span>
                  <div className="text-yellow-400 text-lg font-bold">x{(100 / getWinChance()).toFixed(2)}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-blue-400 font-semibold">Gains potentiels : </span>
                  <span className="text-green-400 text-lg font-bold">
                    {Math.floor(5 * (100 / getWinChance()) * (isBoostActive ? 1.2 : 1))} R$
                  </span>
                </div>
                {isBoostActive && (
                  <div className="col-span-2">
                    <span className="text-green-400 font-semibold">🚀 Mode boost actif : +20% gains</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Launch Button */}
          <Button
            onClick={rollDice}
            disabled={isRolling}
            className={cn(
              "w-full py-4 text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg",
              isRolling && "opacity-75 cursor-not-allowed"
            )}
          >
            {isRolling ? "🎲 LANCEMENT..." : "🎯 LANCER LE DÉ"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
