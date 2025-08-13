import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface RobloxPopupProps {
  isOpen: boolean;
  robuxAmount: number;
  onClose: () => void;
  onSubmit: (username: string) => void;
}

export function RobloxPopup({
  isOpen,
  robuxAmount,
  onClose,
  onSubmit,
}: RobloxPopupProps) {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!username.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate processing
    onSubmit(username.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-bounce-in">
      <Card className="w-full max-w-md mx-4 p-8 bg-gradient-to-br from-card via-card to-muted border-2 border-roulette-gold shadow-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-roulette-gold mb-2">
            Congratulations!
          </h2>
          <p className="text-xl text-green-400 font-bold mb-2">
            You win {robuxAmount} Robux!
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Enter your Roblox username to claim your reward
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Roblox Username
              </label>
              <Input
                type="text"
                placeholder="Enter your Roblox username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-center text-lg"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!username.trim() || isSubmitting}
                className={cn(
                  "flex-1 bg-roulette-gold hover:bg-yellow-500 text-roulette-black font-bold",
                  isSubmitting && "opacity-75",
                )}
              >
                {isSubmitting ? "Processing..." : "Validate"}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
