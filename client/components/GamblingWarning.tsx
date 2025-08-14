import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface GamblingWarningProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function GamblingWarning({
  isOpen,
  onClose,
  className,
}: GamblingWarningProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Popup */}
      <div
        className={cn(
          "relative bg-red-600 border-4 border-red-500 rounded-lg p-6 max-w-md mx-4 shadow-2xl",
          "animate-bounce-in",
          className,
        )}
      >
        <div className="text-center space-y-4">
          {/* Warning Icon */}
          <div className="text-6xl animate-pulse">⚠️</div>

          {/* Title */}
          <h2 className="text-2xl font-black text-white tracking-wide">
            ATTENTION !
          </h2>

          {/* Warning Message */}
          <div className="space-y-2">
            <p className="text-white font-bold text-lg">🎰 JEU D'ARGENT</p>
            <p className="text-red-100 font-medium">
              Ça peut avoir des{" "}
              <span className="text-yellow-300 font-bold">CONSÉQUENCES</span>
            </p>
            <p className="text-red-200 text-sm">
              Jouer de manière responsable !
            </p>
          </div>

          {/* Separator */}
          <div className="border-t-2 border-red-400 my-4"></div>

          {/* Additional warning */}
          <div className="bg-red-700/50 rounded-lg p-3">
            <p className="text-red-100 text-sm font-medium">
              ⚡ Les jeux peuvent créer une dépendance
            </p>
            <p className="text-red-200 text-xs mt-1">
              Demandez de l'aide si nécessaire
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={onClose}
            className="w-full bg-white text-red-600 hover:bg-red-50 font-bold text-lg py-3 mt-4"
          >
            J'AI COMPRIS
          </Button>
        </div>

        {/* Danger stripes */}
        <div className="absolute -top-2 -left-2 -right-2 h-4 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-t-lg opacity-80"></div>
        <div className="absolute -bottom-2 -left-2 -right-2 h-4 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-b-lg opacity-80"></div>
      </div>
    </div>
  );
}
