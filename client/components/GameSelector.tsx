import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameSelectorProps {
  onSelectGame: (game: "roulette" | "slots") => void;
  className?: string;
}

export function GameSelector({ onSelectGame, className }: GameSelectorProps) {
  return (
    <div className={cn("flex flex-col items-center space-y-8", className)}>
      {/* Main Title */}
      <div className="text-center space-y-4">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 tracking-wider">
          🎰 ROBUX CASINO
        </h1>
        <div className="text-2xl text-gray-300 font-medium">
          Choisissez votre jeu préféré
        </div>
      </div>

      {/* Game Selection */}
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Roulette Game */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-red-500 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-red-400">ROULETTE</h2>
            <div className="text-gray-300 space-y-2">
              <div>🎯 Faites tourner la roue</div>
              <div>💰 Gagnez jusqu'à 100 R$</div>
              <div>🚀 Mode boost disponible</div>
            </div>
            <Button
              onClick={() => onSelectGame("roulette")}
              className="w-full py-3 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl"
            >
              🎲 JOUER À LA ROULETTE
            </Button>
          </div>
        </div>

        {/* Slot Machine Game */}
        <div className="bg-gray-900/50 backdrop-blur-sm border-2 border-yellow-500 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-yellow-400">
              MACHINE À SOUS
            </h2>
            <div className="text-gray-300 space-y-2">
              <div>🍒 Alignez 3 symboles</div>
              <div>💎 Jusqu'à 100 R$ le jackpot</div>
              <div>⭐ Boost pour meilleurs symboles</div>
            </div>
            <Button
              onClick={() => onSelectGame("slots")}
              className="w-full py-3 text-lg font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 rounded-xl"
            >
              🎰 JOUER AUX MACHINES
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
