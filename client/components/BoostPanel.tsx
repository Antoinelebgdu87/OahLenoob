import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BoostPanelProps {
  isVisible: boolean;
  isBoostActive: boolean;
  isAlertMode: boolean;
  onToggleBoost: () => void;
  onToggleAlert: () => void;
  className?: string;
}

export function BoostPanel({ 
  isVisible, 
  isBoostActive, 
  isAlertMode, 
  onToggleBoost, 
  onToggleAlert,
  className 
}: BoostPanelProps) {
  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50",
      "bg-gray-900/95 backdrop-blur-sm border border-yellow-500 rounded-lg p-6 shadow-2xl",
      "animate-bounce-in",
      className
    )}>
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-yellow-400 font-bold text-lg mb-2">🎮 BOOST PANEL</h3>
          <p className="text-gray-300 text-sm">Utilise les touches pour contrôler</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">🚀</span>
              <span className="text-white font-medium">Boost Mode</span>
              <span className="text-gray-400 text-sm">(Touche 1)</span>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-bold",
              isBoostActive 
                ? "bg-green-500 text-white" 
                : "bg-gray-600 text-gray-300"
            )}>
              {isBoostActive ? "ACTIF" : "INACTIF"}
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-red-400">⚠️</span>
              <span className="text-white font-medium">Mode Alerte</span>
              <span className="text-gray-400 text-sm">(Touche 2)</span>
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-xs font-bold",
              isAlertMode 
                ? "bg-red-500 text-white animate-pulse" 
                : "bg-gray-600 text-gray-300"
            )}>
              {isAlertMode ? "ALERTE" : "NORMAL"}
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-2">
          <div className="text-gray-400 text-xs space-y-1">
            <div>• Ctrl+F1: Activer boost (10s)</div>
            <div>• Ctrl+F2: Musique</div>
            <div>• Maintenir Ctrl: Ouvrir panel</div>
          </div>
        </div>
        
        {isAlertMode && (
          <div className="text-center p-2 bg-red-500/20 border border-red-500 rounded-lg animate-pulse">
            <span className="text-red-400 font-bold text-sm">
              ⚠️ MODE ALERTE ACTIVÉ ⚠️
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
