import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface GameStatsProps {
  wins: number;
  losses: number;
  totalEarnings: number;
  lastResult?: {
    number: number;
    won: boolean;
    amount: number;
  };
  className?: string;
}

export function GameStats({
  wins,
  losses,
  totalEarnings,
  lastResult,
  className,
}: GameStatsProps) {
  const totalGames = wins + losses;
  const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

  const getNumberColor = (num: number): string => {
    if (num === 0) return "text-roulette-green";
    const redNumbers = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];
    return redNumbers.includes(num) ? "text-roulette-red" : "text-white";
  };

  return (
    <Card
      className={cn("p-6 bg-card/95 backdrop-blur border-border/50", className)}
    >
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
        Game Statistics
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{wins}</div>
          <div className="text-sm text-muted-foreground">Wins</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{losses}</div>
          <div className="text-sm text-muted-foreground">Losses</div>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className="text-lg font-semibold text-foreground">
          Win Rate: {winRate}%
        </div>
        <div
          className={cn(
            "text-xl font-bold",
            totalEarnings >= 0 ? "text-green-400" : "text-red-400",
          )}
        >
          Total: {totalEarnings >= 0 ? "+" : ""}
          {totalEarnings}€
        </div>
      </div>

      {lastResult && (
        <div className="border-t border-border pt-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">
              Last Result
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                  lastResult.number === 0
                    ? "bg-roulette-green text-white"
                    : getNumberColor(lastResult.number) === "text-roulette-red"
                      ? "bg-roulette-red text-white"
                      : "bg-gray-900 text-white",
                )}
              >
                {lastResult.number}
              </div>
              <span
                className={cn(
                  "font-semibold",
                  lastResult.won ? "text-green-400" : "text-red-400",
                )}
              >
                {lastResult.won ? "+" : "-"}
                {lastResult.amount}€
              </span>
            </div>
            <div
              className={cn(
                "text-sm font-medium",
                lastResult.won ? "text-green-400" : "text-red-400",
              )}
            >
              {lastResult.won ? "🎉 WIN!" : "💔 LOSE"}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
