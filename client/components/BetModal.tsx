import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BetModalProps {
  isOpen: boolean;
  gameName: string;
  onClose: () => void;
  onConfirm: (playerName: string, betAmount: number) => void;
}

export function BetModal({
  isOpen,
  gameName,
  onClose,
  onConfirm,
}: BetModalProps) {
  const [playerName, setPlayerName] = useState("");
  const [betAmount, setBetAmount] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!playerName.trim() || betAmount < 1) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate processing
    onConfirm(playerName.trim(), betAmount);
    setIsSubmitting(false);

    // Reset form
    setPlayerName("");
    setBetAmount(5);
  };

  const presetBets = [1, 5, 10, 25, 50, 100];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 p-6 bg-gradient-to-br from-card via-card to-muted border-2 border-yellow-500 shadow-2xl">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-yellow-400">
            PLACER UNE MISE
          </h2>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="text-lg font-semibold text-white mb-1">
              {gameName.toUpperCase()}
            </div>
            <div className="text-sm text-gray-400">
              Entrez vos informations pour commencer
            </div>
          </div>

          <div className="space-y-4">
            {/* Player Name */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nom du joueur
              </label>
              <Input
                type="text"
                placeholder="Entrez votre nom"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="text-center text-lg"
                disabled={isSubmitting}
                maxLength={20}
              />
            </div>

            {/* Bet Amount */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mise en R$ ({betAmount} R$)
              </label>

              {/* Preset buttons */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {presetBets.map((amount) => (
                  <Button
                    key={amount}
                    variant={betAmount === amount ? "default" : "outline"}
                    onClick={() => setBetAmount(amount)}
                    disabled={isSubmitting}
                    className="text-sm"
                  >
                    {amount} R$
                  </Button>
                ))}
              </div>

              {/* Custom amount slider */}
              <Input
                type="range"
                min="1"
                max="100"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="w-full"
                disabled={isSubmitting}
              />

              {/* Custom input */}
              <Input
                type="number"
                min="1"
                max="1000"
                value={betAmount}
                onChange={(e) =>
                  setBetAmount(Math.max(1, Number(e.target.value)))
                }
                className="text-center mt-2"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-yellow-900/20 p-3 rounded-lg border border-yellow-500">
            <div className="text-yellow-400 font-bold text-sm">RÉSUMÉ</div>
            <div className="text-white">
              <span className="font-semibold">{playerName || "Joueur"}</span>{" "}
              mise{" "}
              <span className="text-yellow-400 font-bold">{betAmount} R$</span>{" "}
              sur <span className="font-semibold">{gameName}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!playerName.trim() || betAmount < 1 || isSubmitting}
              className={cn(
                "flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-bold",
                isSubmitting && "opacity-75",
              )}
            >
              {isSubmitting ? "Validation..." : "CONFIRMER"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
