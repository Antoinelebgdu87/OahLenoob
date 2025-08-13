import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RouletteWheel } from "@/components/RouletteWheel";
import { BettingPanel } from "@/components/BettingPanel";
import { GameStats } from "@/components/GameStats";
import { RobloxPopup } from "@/components/RobloxPopup";
import { SuccessPopup } from "@/components/SuccessPopup";
import { cn } from "@/lib/utils";

interface GameResult {
  number: number;
  won: boolean;
  amount: number;
}

export default function Index() {
  const [currentBet, setCurrentBet] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [lastResult, setLastResult] = useState<GameResult | undefined>();
  const [showRobloxPopup, setShowRobloxPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [winningNumber, setWinningNumber] = useState<number>(0);
  const [submittedUsername, setSubmittedUsername] = useState<string>("");

  const handleBet = (amount: number) => {
    if (!isSpinning) {
      setCurrentBet(amount);
    }
  };

  const handleSpin = () => {
    if (currentBet && !isSpinning) {
      setIsSpinning(true);
    }
  };

  const handleSpinComplete = (resultNumber: number) => {
    setIsSpinning(false);
    
    if (!currentBet) return;

    // Simple win condition: win on even numbers (except 0), lose on odd
    const isWin = resultNumber !== 0 && resultNumber % 2 === 0;
    
    if (isWin) {
      setWins(prev => prev + 1);
      setTotalEarnings(prev => prev + currentBet);
      setWinningNumber(resultNumber);
      setShowRobloxPopup(true);
    } else {
      setLosses(prev => prev + 1);
      setTotalEarnings(prev => prev - currentBet);
    }

    const result: GameResult = {
      number: resultNumber,
      won: isWin,
      amount: currentBet
    };

    setLastResult(result);
    setCurrentBet(null);
  };

  const handleRobloxSubmit = (username: string) => {
    setSubmittedUsername(username);
    setShowRobloxPopup(false);
    setShowSuccessPopup(true);
  };

  const handleRobloxClose = () => {
    setShowRobloxPopup(false);
  };

  const resetGame = () => {
    setCurrentBet(null);
    setWins(0);
    setLosses(0);
    setTotalEarnings(0);
    setLastResult(undefined);
    setShowRobloxPopup(false);
    setShowSuccessPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-roulette-gold via-yellow-400 to-roulette-gold mb-4">
            🎰 Roulette Royale
          </h1>
          <p className="text-lg text-muted-foreground">
            Spin to win Robux! No limits, infinite plays!
          </p>
        </div>

        {/* Main Game Area */}
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - Betting */}
            <div className="space-y-6">
              <BettingPanel
                onBet={handleBet}
                isSpinning={isSpinning}
              />
              
              <GameStats
                wins={wins}
                losses={losses}
                totalEarnings={totalEarnings}
                lastResult={lastResult}
              />
            </div>

            {/* Center - Roulette Wheel */}
            <div className="flex flex-col items-center space-y-6">
              <RouletteWheel
                onSpinComplete={handleSpinComplete}
                isSpinning={isSpinning}
                className="mx-auto"
              />
              
              <div className="flex flex-col items-center space-y-4">
                <Button
                  size="lg"
                  className={cn(
                    "px-8 py-3 text-lg font-bold transition-all duration-200",
                    currentBet
                      ? "bg-roulette-gold hover:bg-yellow-500 text-roulette-black shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                      : "opacity-50 cursor-not-allowed"
                  )}
                  onClick={handleSpin}
                  disabled={!currentBet || isSpinning}
                >
                  {isSpinning ? "🎰 SPINNING..." : "🎯 SPIN TO WIN ROBUX!"}
                </Button>
                
                {currentBet && !isSpinning && (
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Current Bet</div>
                    <div className="text-xl font-bold text-roulette-gold">{currentBet}€</div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Game Rules & Actions */}
            <div className="space-y-6">
              <Card className="p-6 bg-card/95 backdrop-blur border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-4">How to Win Robux</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-roulette-gold">1.</span>
                    Choose your bet amount
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-roulette-gold">2.</span>
                    Click "SPIN TO WIN ROBUX!"
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-roulette-gold">3.</span>
                    Win on <span className="text-green-400">even numbers</span> (except 0)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-roulette-gold">4.</span>
                    Enter your Roblox username to claim!
                  </div>
                </div>
              </Card>

              {lastResult && !lastResult.won && (
                <Card className="p-6 bg-red-900/20 border-red-400 animate-bounce-in">
                  <div className="text-center">
                    <div className="text-xl font-bold text-red-400 mb-2">💔 Better luck next time!</div>
                    <div className="text-lg">
                      Number: <span className="font-bold text-roulette-gold">{lastResult.number}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      Try again! Unlimited spins available.
                    </div>
                  </div>
                </Card>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={resetGame}
              >
                🔄 Reset Stats
              </Button>

              <Card className="p-4 bg-gradient-to-br from-roulette-gold/10 to-yellow-500/10 border-roulette-gold/30">
                <div className="text-center">
                  <div className="text-sm font-medium text-roulette-gold">🎮 FREE ROBUX</div>
                  <div className="text-xs text-muted-foreground">Infinite plays • No limits</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      <RobloxPopup
        isOpen={showRobloxPopup}
        winningNumber={winningNumber}
        onClose={handleRobloxClose}
        onSubmit={handleRobloxSubmit}
      />

      <SuccessPopup
        isOpen={showSuccessPopup}
        username={submittedUsername}
      />
    </div>
  );
}
