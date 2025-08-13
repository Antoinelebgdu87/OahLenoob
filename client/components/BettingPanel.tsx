import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BettingPanelProps {
  onBet: (amount: number) => void;
  isSpinning: boolean;
  className?: string;
}

const BET_AMOUNTS = [10, 20, 30, 50, 100];

export function BettingPanel({
  onBet,
  isSpinning,
  className,
}: BettingPanelProps) {
  const [selectedBet, setSelectedBet] = useState<number | null>(null);

  const handleBetSelect = (amount: number) => {
    if (isSpinning) return;
    setSelectedBet(amount);
    onBet(amount);
  };

  return (
    <Card
      className={cn("p-6 bg-card/95 backdrop-blur border-border/50", className)}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Place Your Bet
        </h3>
        <div className="text-lg text-muted-foreground">
          Choose your bet amount
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {BET_AMOUNTS.map((amount) => {
          const isSelected = selectedBet === amount;

          return (
            <Button
              key={amount}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "h-12 text-lg font-bold transition-all duration-200 hover:scale-105 active:scale-95",
                isSelected &&
                  "bg-roulette-gold text-roulette-black border-roulette-gold",
              )}
              onClick={() => handleBetSelect(amount)}
              disabled={isSpinning}
            >
              {amount}€
            </Button>
          );
        })}
      </div>

      {selectedBet && (
        <div className="text-center text-sm text-muted-foreground">
          Bet placed:{" "}
          <span className="text-roulette-gold font-semibold">
            {selectedBet}€
          </span>
        </div>
      )}

      {isSpinning && (
        <div className="text-center text-sm text-primary animate-pulse">
          🎰 Spinning... Good luck!
        </div>
      )}
    </Card>
  );
}
