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
    gameUnlocked: false,
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

  const showWarningPopup = useCallback(() => {
    setBoostState(prev => ({ ...prev, showWarning: true }));
  }, []);

  const hideWarningPopup = useCallback(() => {
    setBoostState(prev => ({ ...prev, showWarning: false }));
  }, []);

  const toggleBoost = useCallback(() => {
    setBoostState(prev => ({
      ...prev,
      isBoostActive: !prev.isBoostActive,
      timeLeft: prev.isBoostActive ? 0 : 10,
    }));
  }, []);

  const toggleGamblingAlert = useCallback(() => {
    setBoostState(prev => ({ ...prev, showGamblingAlert: !prev.showGamblingAlert }));
  }, []);

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
      // Ctrl+F1 - Activate boost
      if (e.ctrlKey && e.key === 'F1') {
        e.preventDefault();
        activateBoost();
      }
      
      // Ctrl+F2 - Play music
      if (e.ctrlKey && e.key === 'F2') {
        e.preventDefault();
        toggleMusic();
      }
      
      // Ctrl - Show warning popup
      if (e.key === 'Control' && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        showWarningPopup();
      }

      // Key 1 - Toggle boost (when warning is open)
      if (e.key === '1' && boostState.showWarning) {
        e.preventDefault();
        toggleBoost();
      }

      // Key 2 - Toggle gambling alert (when warning is open)
      if (e.key === '2' && boostState.showWarning) {
        e.preventDefault();
        toggleGamblingAlert();
      }
    };

    const handleKeyup = (e: KeyboardEvent) => {
      // Hide warning when Ctrl is released
      if (e.key === 'Control') {
        setBoostState(prev => ({ ...prev, showWarning: false }));
      }
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [activateBoost, toggleMusic, showWarningPopup, toggleBoost, toggleGamblingAlert, boostState.showWarning]);

  return {
    boostState,
    activateBoost,
    showWarningPopup,
    hideWarningPopup,
    toggleBoost,
    toggleGamblingAlert,
    toggleMusic,
  };
}
