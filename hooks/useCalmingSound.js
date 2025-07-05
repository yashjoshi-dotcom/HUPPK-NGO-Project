// hooks/useCalmingSound.js
import { useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';

export const useCalmingSound = () => {
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/morning_in_forest.mp3'),
        { isLooping: true, shouldPlay: false }
      );
      soundRef.current = sound;
    };

    loadSound();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const toggleSound = async () => {
    const sound = soundRef.current;
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  return { isPlaying, toggleSound };
};
