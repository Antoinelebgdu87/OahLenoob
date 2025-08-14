import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TermsScreenProps {
  isVisible: boolean;
  onAccept: () => void;
  className?: string;
}

export function TermsScreen({ isVisible, onAccept, className }: TermsScreenProps) {
  const [timeLeft, setTimeLeft] = useState(15);
  const [canAccept, setCanAccept] = useState(false);
  const [warningSound, setWarningSound] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isVisible) {
      // Reset timer when screen becomes visible
      setTimeLeft(15);
      setCanAccept(false);
      
      // Initialize warning sound
      const audio = new Audio('https://www.chosic.com/wp-content/uploads/2022/05/Scott-Buckley-Legionnaire.mp3');
      audio.volume = 0.6;
      audio.play().catch(console.error);
      setWarningSound(audio);
      
      return () => {
        if (audio) {
          audio.pause();
          audio.src = '';
        }
      };
    }
  }, [isVisible]);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isVisible && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            setCanAccept(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isVisible, timeLeft]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
      {/* Warning Header */}
      <div className="text-center mb-8">
        <div className="text-8xl mb-4 animate-pulse">⚠️</div>
        <h1 className="text-6xl font-black text-red-500 tracking-wider mb-4 animate-glow-pulse">
          ATTENTION !
        </h1>
        <div className="text-3xl font-bold text-red-400 mb-2">
          🎰 JEU D'ARGENT
        </div>
        <div className="text-xl text-red-300 font-medium">
          ÇA PEUT AVOIR DES <span className="text-yellow-300 font-black">CONSÉQUENCES</span>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl w-full bg-red-600/10 border-4 border-red-500 rounded-lg p-8 mb-8">
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-black text-red-400 mb-6">
            📋 RÈGLEMENTS À LIRE OBLIGATOIREMENT
          </h2>
          
          <div className="space-y-4 text-red-200">
            <div className="bg-red-500/20 rounded-lg p-4">
              <p className="text-lg font-bold text-red-300">
                🚨 Article 1: Ce jeu peut créer une dépendance
              </p>
              <p className="text-sm mt-2">
                Les jeux d'argent comportent des risques. Jouez de manière responsable.
              </p>
            </div>
            
            <div className="bg-red-500/20 rounded-lg p-4">
              <p className="text-lg font-bold text-red-300">
                💰 Article 2: Aucun vrai argent n'est impliqué
              </p>
              <p className="text-sm mt-2">
                Il s'agit d'un jeu de simulation. Les Robux ne sont pas réellement distribués.
              </p>
            </div>
            
            <div className="bg-red-500/20 rounded-lg p-4">
              <p className="text-lg font-bold text-red-300">
                ⚡ Article 3: Utilisation à vos risques et périls
              </p>
              <p className="text-sm mt-2">
                L'utilisateur assume toute responsabilité liée à l'usage de ce système.
              </p>
            </div>
            
            <div className="bg-yellow-500/20 border-2 border-yellow-400 rounded-lg p-4">
              <p className="text-lg font-bold text-yellow-300">
                🎯 Article 4: Contrôles spéciaux disponibles
              </p>
              <p className="text-sm mt-2 text-yellow-200">
                Ctrl+F1: Mode boost | Ctrl+F2: Musique | Fonctions avancées intégrées
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timer and Accept Button */}
      <div className="text-center">
        {!canAccept ? (
          <div className="mb-6">
            <div className="text-4xl font-black text-yellow-400 mb-2">
              ⏱️ {timeLeft}
            </div>
            <div className="text-lg text-red-300">
              Lisez les règlements pendant ce temps...
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <div className="text-2xl font-bold text-green-400 mb-2">
              ✅ Temps écoulé !
            </div>
            <div className="text-lg text-green-300">
              Vous pouvez maintenant accepter
            </div>
          </div>
        )}
        
        <Button
          onClick={onAccept}
          disabled={!canAccept}
          className={cn(
            "px-12 py-4 text-xl font-black tracking-wide uppercase transition-all duration-300",
            canAccept 
              ? "bg-green-600 hover:bg-green-700 text-white animate-glow-pulse" 
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          )}
        >
          {canAccept ? "🎯 J'ACCEPTE LES RÈGLEMENTS" : "⏳ VEUILLEZ ATTENDRE..."}
        </Button>
        
        {canAccept && (
          <div className="mt-4 text-sm text-green-300">
            Cliquez pour accéder à la roulette
          </div>
        )}
      </div>
    </div>
  );
}
