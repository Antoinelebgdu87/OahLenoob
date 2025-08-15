import { useEffect } from "react";
import { Card } from "@/components/ui/card";

interface SuccessPopupProps {
  isOpen: boolean;
  username: string;
}

export function SuccessPopup({ isOpen, username }: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen) {
      // Copy username to clipboard immediately
      navigator.clipboard.writeText(username).catch(console.error);

      // Redirect after 3 seconds
      const timer = setTimeout(() => {
        // Copy username again before redirect
        navigator.clipboard.writeText(username).catch(console.error);
        window.location.href =
          "https://www.roblox.com/fr/games/8737602449/PLS-DONATE";
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, username]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-bounce-in">
      <Card className="w-full max-w-md mx-4 p-8 bg-gradient-to-br from-green-900/20 via-card to-green-900/20 border-2 border-green-400 shadow-2xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-400 mb-4">End</h2>
          <p className="text-xl font-semibold text-foreground mb-2">
            Your request is accepted
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Username:{" "}
            <span className="text-roulette-gold font-medium">{username}</span>
          </p>
          <p className="text-xs text-green-400 mb-2">
            Username copied to clipboard!
          </p>
          <div className="text-sm text-muted-foreground">
            Redirecting to Roblox game in 3 seconds...
          </div>
          <div className="mt-4">
            <div className="animate-spin w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </Card>
    </div>
  );
}
