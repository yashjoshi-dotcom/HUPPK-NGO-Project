// hooks/useCalmingSound.js
import { useAudioPlayer } from 'expo-audio';
import { useEffect } from 'react';

// The audio file is loaded here once to be used by the hook
const audioSource = require('../assets/audio/morning_in_forest.mp3');

export const useCalmingSound = () => {
  const player = useAudioPlayer(audioSource, {
    loop: true,
  });

  // Toggle Func checks the 'playing' property and calls the appropriate method.
  const toggleSound = () => {
    // Safety check to prevent errors if the sound isn't loaded yet.
    if (!player.isLoaded) {
      return;
    }

    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  useEffect(() => {
    return () => {
      if (player.isLoaded) {
        player.pause(); // Stop playing when the component unmounts
      }
    };
  }, [player]);

  return {
    // We export 'player.playing' as 'isPlaying' for a clear and descriptive name.
    isPlaying: player.playing,
    isLoaded: player.isLoaded,
    toggleSound,
  };
};

export default useCalmingSound;

