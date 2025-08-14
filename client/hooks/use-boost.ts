import { useState, useEffect, useCallback } from 'react';

export interface BoostState {
  isBoostActive: boolean;
  timeLeft: number;
  showTerms: boolean;
  gameUnlocked: boolean;
  backgroundMusic: HTMLAudioElement | null;
}

export function useBoost() {
  const [boostState, setBoostState] = useState<BoostState>({
    isBoostActive: false,
    timeLeft: 0,
    showTerms: false,
    gameUnlocked: true,
    backgroundMusic: null,
  });

  // Initialize audio - Using a similar style music since YouTube can't be directly played
  useEffect(() => {
    const audio = new Audio('https://www.chosic.com/wp-content/uploads/2022/05/Scott-Buckley-Legionnaire.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    setBoostState(prev => ({ ...prev, backgroundMusic: audio }));

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (boostState.isBoostActive && boostState.timeLeft > 0) {
      interval = setInterval(() => {
        setBoostState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          if (newTimeLeft <= 0) {
            return { ...prev, isBoostActive: false, timeLeft: 0 };
          }
          return { ...prev, timeLeft: newTimeLeft };
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [boostState.isBoostActive, boostState.timeLeft]);

  const activateBoost = useCallback(() => {
    setBoostState(prev => ({
      ...prev,
      isBoostActive: true,
      timeLeft: 10,
    }));
  }, []);

  const showTermsScreen = useCallback(() => {
    setBoostState(prev => ({ ...prev, showTerms: true }));
  }, []);

  const acceptTerms = useCallback(() => {
    setBoostState(prev => ({
      ...prev,
      showTerms: false,
      gameUnlocked: true
    }));
  }, []);

  const toggleBoost = useCallback(() => {
    if (!boostState.gameUnlocked) return;
    setBoostState(prev => ({
      ...prev,
      isBoostActive: !prev.isBoostActive,
      timeLeft: prev.isBoostActive ? 0 : 10,
    }));
  }, [boostState.gameUnlocked]);

  const toggleMusic = useCallback(() => {
    if (boostState.backgroundMusic) {
      if (boostState.backgroundMusic.paused) {
        boostState.backgroundMusic.play().catch(console.error);
      } else {
        boostState.backgroundMusic.pause();
      }
    }
  }, [boostState.backgroundMusic]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Ctrl+1 - Show terms screen
      if (e.ctrlKey && e.key === '1') {
        e.preventDefault();
        showTermsScreen();
      }

      // Ctrl+F1 - Activate boost (only if game is unlocked)
      if (e.ctrlKey && e.key === 'F1' && boostState.gameUnlocked) {
        e.preventDefault();
        activateBoost();
      }

      // Ctrl+F2 - Play music (only if game is unlocked)
      if (e.ctrlKey && e.key === 'F2' && boostState.gameUnlocked) {
        e.preventDefault();
        toggleMusic();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [activateBoost, toggleMusic, showTermsScreen, boostState.gameUnlocked]);

  return {
    boostState,
    activateBoost,
    showTermsScreen,
    acceptTerms,
    toggleBoost,
    toggleMusic,
  };
}
