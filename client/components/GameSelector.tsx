import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GameSelectorProps {
  onSelectGame: (game: "roulette" | "slots" | "crash" | "dice" | "nyancat") => void;
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

      {/* Game Selection Bar */}
      <div className="w-full max-w-6xl">
        <div className="flex overflow-x-auto space-x-6 pb-4 px-4 scrollbar-hide">
          {/* Roulette Game */}
          <div
            onClick={() => onSelectGame("roulette")}
            className="min-w-[200px] bg-gray-900/80 backdrop-blur-sm border-2 border-red-500 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-red-500/25"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-xl font-bold text-white border-2 border-red-400 mx-auto">R</div>
              <h3 className="text-xl font-bold text-red-400">ROULETTE</h3>
              <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">FACILE</div>
              <div className="text-sm text-gray-300">Gains: 5-100 R$</div>
            </div>
          </div>

          {/* Slot Machine Game */}
          <div
            onClick={() => onSelectGame("slots")}
            className="min-w-[200px] bg-gray-900/80 backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-yellow-500/25"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl font-bold text-gray-900 border-2 border-yellow-400 mx-auto">S</div>
              <h3 className="text-xl font-bold text-yellow-400">MACHINES</h3>
              <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">FACILE</div>
              <div className="text-sm text-gray-300">Gains: 5-100 R$</div>
            </div>
          </div>

          {/* Crash Game */}
          <div
            onClick={() => onSelectGame("crash")}
            className="min-w-[200px] bg-gray-900/80 backdrop-blur-sm border-2 border-purple-500 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-purple-500/25"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-xl font-bold text-white border-2 border-purple-400 mx-auto">C</div>
              <h3 className="text-xl font-bold text-purple-400">CRASH</h3>
              <div className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-bold">MOYEN</div>
              <div className="text-sm text-gray-300">Gains: x1.1-x20</div>
            </div>
          </div>

          {/* Dice Game */}
          <div
            onClick={() => onSelectGame("dice")}
            className="min-w-[200px] bg-gray-900/80 backdrop-blur-sm border-2 border-blue-500 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-blue-500/25"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white border-2 border-blue-400 mx-auto">D</div>
              <h3 className="text-xl font-bold text-blue-400">DICE</h3>
              <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">DIFFICILE</div>
              <div className="text-sm text-gray-300">Gains: Variables</div>
            </div>
          </div>

          {/* Nyan Cat Game */}
          <div
            onClick={() => onSelectGame("nyancat")}
            className="min-w-[200px] bg-gray-900/80 backdrop-blur-sm border-2 border-pink-500 rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-pink-500/25"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-xl font-bold text-white border-2 border-pink-400 mx-auto">🐱</div>
              <h3 className="text-xl font-bold text-pink-400">NYAN CAT</h3>
              <div className="bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-bold">MOYEN</div>
              <div className="text-sm text-gray-300">Sauvez le chat!</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-2">
          <div className="text-gray-400 text-sm">← Faites défiler pour voir tous les jeux →</div>
        </div>
      </div>

      {/* Game Explanations */}
      <div className="w-full max-w-4xl mt-8 bg-gray-900/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-yellow-400 text-center mb-4">EXPLICATIONS DES JEUX</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-red-900/20 p-4 rounded-lg border border-red-500">
            <h4 className="text-red-400 font-bold mb-2">ROULETTE</h4>
            <p className="text-gray-300">Cliquez pour faire tourner la roue. Elle s'arrête sur un nombre qui détermine vos gains automatiquement. Aucune stratégie requise !</p>
          </div>

          <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500">
            <h4 className="text-yellow-400 font-bold mb-2">MACHINES À SOUS</h4>
            <p className="text-gray-300">Appuyez sur SPIN et regardez les 3 symboles. Si 3 symboles identiques apparaissent, vous gagnez le jackpot correspondant !</p>
          </div>

          <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500">
            <h4 className="text-purple-400 font-bold mb-2">CRASH GAME</h4>
            <p className="text-gray-300">Le multiplicateur monte rapidement ! Vous devez cliquer "ENCAISSER" avant qu'il crash pour gagner. Plus vous attendez, plus vous gagnez... mais plus le risque est grand !</p>
          </div>

          <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500">
            <h4 className="text-blue-400 font-bold mb-2">DICE GAME</h4>
            <p className="text-gray-300">Choisissez un nombre et pariez si le dé sera "PLUS" ou "MOINS" que ce nombre. Plus votre prédiction est risquée, plus vous gagnez !</p>
          </div>

          <div className="bg-pink-900/20 p-4 rounded-lg border border-pink-500">
            <h4 className="text-pink-400 font-bold mb-2">NYAN CAT</h4>
            <p className="text-gray-300">Nyan Cat s'envole ! Sauvez-le en cliquant "SAUVER LE CHAT" avant qu'il s'envole trop haut. Plus il monte, plus vous gagnez !</p>
          </div>

          <div className="bg-green-900/20 p-4 rounded-lg border border-green-500">
            <h4 className="text-green-400 font-bold mb-2">SYSTÈME DE MISE</h4>
            <p className="text-gray-300">Avant chaque partie, entrez votre nom et choisissez votre mise. Vos résultats s'affichent dans l'historique sur le côté !</p>
          </div>
        </div>
      </div>
    </div>
  );
}
