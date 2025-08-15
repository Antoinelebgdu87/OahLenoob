import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NyanCatGameProps {
  onWin: (robuxAmount: number) => void;
  isBoostActive: boolean;
}

export function NyanCatGame({ onWin, isBoostActive }: NyanCatGameProps) {
  const [isFlying, setIsFlying] = useState(false);
  const [height, setHeight] = useState(0);
  const [hasLanded, setHasLanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isFlying && !hasLanded) {
      // Generate random max height between 50 and 300 meters
      const maxH = Math.random() * 250 + 50;
      setMaxHeight(maxH);
      
      interval = setInterval(() => {
        setHeight(prev => {
          const next = prev + 2; // Le chat monte de 2m par tick
          if (next >= maxH) {
            setIsFlying(false);
            setHasLanded(false);
            return maxH;
          }
          return next;
        });
      }, 50); // Update toutes les 50ms
    }

    return () => clearInterval(interval);
  }, [isFlying, hasLanded]);

  const startFlight = () => {
    setIsFlying(true);
    setHasLanded(false);
    setHeight(0);
  };

  const saveCat = () => {
    if (isFlying) {
      setIsFlying(false);
      setHasLanded(true);
      
      // Calcul des gains basé sur la hauteur
      const baseWin = Math.floor(height / 10); // 1 R$ par 10m
      const boostMultiplier = isBoostActive ? 1.3 : 1;
      const finalWin = Math.floor(baseWin * boostMultiplier);
      
      onWin(Math.max(finalWin, 1)); // Minimum 1 R$
    }
  };

  const getCatPosition = () => {
    const maxDisplayHeight = 200; // pixels max pour l'affichage
    const displayHeight = Math.min((height / maxHeight) * maxDisplayHeight, maxDisplayHeight);
    return maxDisplayHeight - displayHeight;
  };

  return (
    <div className="flex flex-col items-center space-y-4 max-w-2xl mx-auto">
      <Card className="w-full p-4 bg-gradient-to-br from-pink-900/20 via-card to-blue-900/20 border-2 border-pink-500">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-pink-400">NYAN CAT</h2>
          
          {/* Game Display */}
          <div className="bg-black/30 p-4 rounded-lg border border-pink-400 relative overflow-hidden" style={{ height: '250px' }}>
            {/* Sky background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-blue-600/20"></div>
            
            {/* Rainbow trail */}
            {isFlying && (
              <div 
                className="absolute w-full bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 opacity-60 transition-all duration-100"
                style={{
                  top: `${getCatPosition() + 15}px`,
                  height: '8px',
                  left: '0'
                }}
              />
            )}
            
            {/* Nyan Cat */}
            <div 
              className={cn(
                "absolute transition-all duration-100 text-2xl",
                isFlying && "animate-bounce"
              )}
              style={{
                top: `${getCatPosition()}px`,
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              {isFlying ? "🐱‍🚀" : hasLanded ? "😸" : "😺"}
            </div>
            
            {/* Clouds */}
            <div className="absolute top-4 left-4 text-white text-xl opacity-60">☁️</div>
            <div className="absolute top-8 right-8 text-white text-lg opacity-40">☁️</div>
            <div className="absolute top-16 left-16 text-white text-sm opacity-50">☁️</div>
            
            {/* Height display */}
            <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
              {Math.floor(height)}m
            </div>
            
            {/* Max height warning */}
            {isFlying && height > maxHeight * 0.8 && (
              <div className="absolute top-2 right-2 bg-red-500/80 px-2 py-1 rounded text-white text-xs animate-pulse">
                ATTENTION !
              </div>
            )}
          </div>
          
          {/* Status Messages */}
          {height >= maxHeight && !hasLanded && isFlying && (
            <div className="text-xl text-red-500 font-bold">
              Nyan Cat s'est envolé trop haut !
            </div>
          )}
          
          {hasLanded && (
            <div className="text-xl text-green-500 font-bold">
              Chat sauvé à {Math.floor(height)}m !
            </div>
          )}

          {/* Potential Winnings Display */}
          {isFlying && (
            <div className="bg-green-900/30 p-2 rounded border border-green-500 text-sm">
              <span className="text-green-400 font-bold">
                Gains potentiels : {Math.floor((height / 10) * (isBoostActive ? 1.3 : 1))} R$
              </span>
            </div>
          )}

          {/* Game Info */}
          <div className="bg-gray-800/50 p-3 rounded text-xs text-gray-300">
            <div className="flex justify-between">
              <span>1 R$ = 10m</span>
              <span>Max: 300m</span>
              {isBoostActive && <span className="text-green-400">Boost +30%</span>}
            </div>
            <div className="text-center mt-1 text-pink-400">
              Sauvez Nyan Cat avant qu'il s'envole !
            </div>
          </div>

          {/* Game Controls */}
          <div className="space-y-2">
            {!isFlying ? (
              <Button
                onClick={startFlight}
                className="w-full py-3 text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg"
              >
                LANCER NYAN CAT
              </Button>
            ) : (
              <Button
                onClick={saveCat}
                disabled={height >= maxHeight}
                className={cn(
                  "w-full py-3 text-lg font-bold bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-lg",
                  height >= maxHeight ? "opacity-50 cursor-not-allowed" : "animate-pulse"
                )}
              >
                SAUVER LE CHAT
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
