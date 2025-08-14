import { cn } from "@/lib/utils";

interface WarningPopupProps {
  isVisible: boolean;
  isBoostActive: boolean;
  className?: string;
}

export function WarningPopup({
  isVisible,
  isBoostActive,
  className,
}: WarningPopupProps) {
  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50",
        "bg-red-600 border-4 border-red-500 rounded-lg p-6 shadow-2xl",
        "animate-bounce-in",
        className,
      )}
    >
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <h3 className="text-white font-black text-xl mb-2">AVERTISSEMENT</h3>
          <p className="text-red-100 text-sm font-medium">
            Panel de contrôle dangereux
          </p>
        </div>

        <div className="space-y-3">
          <div className="bg-red-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">🚀</span>
                <span className="text-white font-medium">Boost</span>
                <span className="text-red-200 text-sm">(Touche 1)</span>
              </div>
              <div
                className={cn(
                  "px-2 py-1 rounded text-xs font-bold",
                  isBoostActive
                    ? "bg-green-500 text-white"
                    : "bg-gray-600 text-gray-300",
                )}
              >
                {isBoostActive ? "ON" : "OFF"}
              </div>
            </div>
          </div>

          <div className="bg-red-700/50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-300">⚠️</span>
                <span className="text-white font-medium">Alerte</span>
                <span className="text-red-200 text-sm">(Touche 2)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="text-red-200 text-xs space-y-1">
            <div>• Ctrl+F1: Boost (10s)</div>
            <div>• Ctrl+F2: Musique</div>
            <div>• Ctrl: Panel (DANGEREUX!)</div>
          </div>
        </div>

        <div className="text-center p-2 bg-yellow-500/20 border border-yellow-400 rounded-lg">
          <span className="text-yellow-200 font-bold text-sm">
            ⚡ UTILISATION À VOS RISQUES ⚡
          </span>
        </div>
      </div>
    </div>
  );
}
