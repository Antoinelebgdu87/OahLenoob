import { useState, useEffect, useCallback } from 'react';

export interface BoostState {
  isBoostActive: boolean;
  timeLeft: number;
  showWarning: boolean;
  showGamblingAlert: boolean;
  backgroundMusic: HTMLAudioElement | null;
}

export function useBoost() {
  const [boostState, setBoostState] = useState<BoostState>({
    isBoostActive: false,
    timeLeft: 0,
    showWarning: false,
    showGamblingAlert: false,
    backgroundMusic: null,
  });

  // Initialize audio
  useEffect(() => {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/fail-buzzer-02.wav');
    audio.loop = true;
    audio.volume = 0.3;
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

  const togglePanel = useCallback(() => {
    setBoostState(prev => ({ ...prev, showPanel: !prev.showPanel }));
  }, []);

  const toggleBoost = useCallback(() => {
    setBoostState(prev => ({
      ...prev,
      isBoostActive: !prev.isBoostActive,
      timeLeft: prev.isBoostActive ? 0 : 10,
    }));
  }, []);

  const toggleAlert = useCallback(() => {
    setBoostState(prev => ({ ...prev, isAlertMode: !prev.isAlertMode }));
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
      
      // Ctrl - Toggle panel
      if (e.key === 'Control' && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        togglePanel();
      }
      
      // Key 1 - Toggle boost (when panel is open)
      if (e.key === '1' && boostState.showPanel) {
        e.preventDefault();
        toggleBoost();
      }
      
      // Key 2 - Toggle alert (when panel is open)
      if (e.key === '2' && boostState.showPanel) {
        e.preventDefault();
        toggleAlert();
      }
    };

    const handleKeyup = (e: KeyboardEvent) => {
      // Hide panel when Ctrl is released
      if (e.key === 'Control') {
        setBoostState(prev => ({ ...prev, showPanel: false }));
      }
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('keyup', handleKeyup);
    
    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [activateBoost, toggleMusic, togglePanel, toggleBoost, toggleAlert, boostState.showPanel]);

  return {
    boostState,
    activateBoost,
    togglePanel,
    toggleBoost,
    toggleAlert,
    toggleMusic,
  };
}
