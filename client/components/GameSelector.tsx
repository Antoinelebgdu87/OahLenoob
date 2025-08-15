import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameSelectorProps {
  onSelectGame: (game: "roulette" | "slots" | "crash" | "dice") => void;
  className?: string;
}

export function GameSelector({ onSelectGame, className }: GameSelectorProps) {
  return (
    <div className={cn("flex flex-col items-center space-y-8", className)}>
      {/* Main Title */}
      <div className="text-center space-y-4">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 tracking-wider">
          ROBUX CASINO
        </h1>
        <div className="text-2xl text-gray-300 font-medium">
          Choisissez votre jeu préféré
        </div>
      </div>

      {/* Game Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Roulette Game */}
        <div className="bg-gray-900/70 backdrop-blur-sm border-2 border-red-500 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-xl">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl font-bold text-white border-4 border-red-400">R</div>
              <h2 className="text-3xl font-bold text-red-400">ROULETTE</h2>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">FACILE</div>
            </div>
            <div className="text-gray-300 space-y-3 text-left bg-gray-800/50 p-4 rounded-lg">
              <div className="font-semibold text-white mb-2">Comment jouer :</div>
              <div className="flex items-center space-x-2">
                <span className="text-red-400">1.</span>
                <span>Cliquez sur "Faire tourner"</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-400">2.</span>
                <span>La roue s'arrête sur un nombre</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-red-400">3.</span>
                <span>Gagnez des R$ automatiquement !</span>
              </div>
              <div className="border-t border-gray-600 pt-2 mt-3">
                <div className="text-yellow-400 font-semibold">Gains : 5-100 R$</div>
              </div>
            </div>
            <Button
              onClick={() => onSelectGame("roulette")}
              className="w-full py-4 text-lg font-bold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg"
            >
              JOUER À LA ROULETTE
            </Button>
          </div>
        </div>

        {/* Slot Machine Game */}
        <div className="bg-gray-900/70 backdrop-blur-sm border-2 border-yellow-500 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-xl">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 border-4 border-yellow-400">S</div>
              <h2 className="text-3xl font-bold text-yellow-400">MACHINES À SOUS</h2>
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">FACILE</div>
            </div>
            <div className="text-gray-300 space-y-3 text-left bg-gray-800/50 p-4 rounded-lg">
              <div className="font-semibold text-white mb-2">Comment jouer :</div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">1.</span>
                <span>Appuyez sur "SPIN"</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">2.</span>
                <span>3 symboles apparaissent</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">3.</span>
                <span>3 identiques = JACKPOT !</span>
              </div>
              <div className="border-t border-gray-600 pt-2 mt-3">
                <div className="text-yellow-400 font-semibold">Gains : 5-100 R$</div>
              </div>
            </div>
            <Button
              onClick={() => onSelectGame("slots")}
              className="w-full py-4 text-lg font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 rounded-xl shadow-lg"
            >
              JOUER AUX MACHINES
            </Button>
          </div>
        </div>

        {/* Crash Game */}
        <div className="bg-gray-900/70 backdrop-blur-sm border-2 border-purple-500 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-xl">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white border-4 border-purple-400">C</div>
              <h2 className="text-3xl font-bold text-purple-400">CRASH</h2>
              <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">MOYEN</div>
            </div>
            <div className="text-gray-300 space-y-3 text-left bg-gray-800/50 p-4 rounded-lg">
              <div className="font-semibold text-white mb-2">Comment jouer :</div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">1.</span>
                <span>Démarrez le multiplicateur</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">2.</span>
                <span>Il monte : 1.1x, 1.5x, 2x...</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">3.</span>
                <span>Encaissez AVANT le crash !</span>
              </div>
              <div className="border-t border-gray-600 pt-2 mt-3">
                <div className="text-purple-400 font-semibold">Gains : Multipliés x1.1 à x20</div>
              </div>
            </div>
            <Button
              onClick={() => onSelectGame("crash")}
              className="w-full py-4 text-lg font-bold bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
            >
              JOUER AU CRASH
            </Button>
          </div>
        </div>

        {/* Dice Game */}
        <div className="bg-gray-900/70 backdrop-blur-sm border-2 border-blue-500 rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 shadow-xl">
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-white border-4 border-blue-400">D</div>
              <h2 className="text-3xl font-bold text-blue-400">DICE</h2>
              <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">DIFFICILE</div>
            </div>
            <div className="text-gray-300 space-y-3 text-left bg-gray-800/50 p-4 rounded-lg">
              <div className="font-semibold text-white mb-2">Comment jouer :</div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">1.</span>
                <span>Choisissez un nombre (1-99)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">2.</span>
                <span>Pariez "Plus" ou "Moins"</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">3.</span>
                <span>Lancez et devinez juste !</span>
              </div>
              <div className="border-t border-gray-600 pt-2 mt-3">
                <div className="text-blue-400 font-semibold">Gains : Variable selon les probabilités</div>
              </div>
            </div>
            <Button
              onClick={() => onSelectGame("dice")}
              className="w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg"
            >
              JOUER AU DICE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
