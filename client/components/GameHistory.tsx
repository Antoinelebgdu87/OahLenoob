import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface GameHistoryEntry {
  id: string;
  playerName: string;
  game: string;
  bet: number;
  result: "won" | "lost";
  winnings?: number;
  timestamp: Date;
}

interface GameHistoryProps {
  history: GameHistoryEntry[];
  className?: string;
}

export function GameHistory({ history, className }: GameHistoryProps) {
  return (
    <Card
      className={cn(
        "w-80 p-4 bg-gray-900/50 border-2 border-gray-700",
        className,
      )}
    >
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-yellow-400 text-center border-b border-gray-600 pb-2">
          HISTORIQUE DES PARTIES
        </h3>

        {history.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            Aucune partie jouée
          </div>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {history
              .slice(-10)
              .reverse()
              .map((entry) => (
                <div
                  key={entry.id}
                  className={cn(
                    "p-3 rounded-lg border-l-4 bg-gray-800/50",
                    entry.result === "won"
                      ? "border-green-500"
                      : "border-red-500",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">
                        {entry.playerName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {entry.game.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-300 mt-1">
                        {entry.timestamp.toLocaleTimeString()}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-300">
                        Mise: {entry.bet} R$
                      </div>
                      <div
                        className={cn(
                          "text-sm font-bold",
                          entry.result === "won"
                            ? "text-green-400"
                            : "text-red-400",
                        )}
                      >
                        {entry.result === "won"
                          ? `+${entry.winnings || 0} R$`
                          : "PERDU"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Statistics */}
        {history.length > 0 && (
          <div className="border-t border-gray-600 pt-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-800/50 p-2 rounded text-center">
                <div className="text-gray-400">Parties</div>
                <div className="text-white font-bold">{history.length}</div>
              </div>
              <div className="bg-gray-800/50 p-2 rounded text-center">
                <div className="text-gray-400">Victoires</div>
                <div className="text-green-400 font-bold">
                  {history.filter((h) => h.result === "won").length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
