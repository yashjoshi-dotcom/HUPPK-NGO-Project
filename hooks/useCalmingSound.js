// hooks/useCalmingSound.js
import { useAudioPlayer } from 'expo-audio';
import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';

// Require the audio file to get its module metadata
const audioModule = require('../assets/audio/child game.mp3');

export const useCalmingSound = () => {
  const [soundURI, setSoundURI] = useState(undefined);

  // Resolve the asset module into a usable URI on mount
  useEffect(() => {
    (async () => {
      try {
        const asset = Asset.fromModule(audioModule);
        await asset.downloadAsync();
        setSoundURI(asset.uri);
      } catch (error) {
        console.error('Failed to load sound asset:', error);
      }
    })();
  }, []);

  // Create the audio player: source URI and optional update interval (ms)
  const player = useAudioPlayer(soundURI, 1000);

  // Once loaded, enable looping on the native player instance
  useEffect(() => {
    if (player.isLoaded) {
      player.loop = true;
    }
  }, [player]);

  // Toggle play/pause with safety check
  const toggleSound = () => {
    if (!player.isLoaded) {
      return;
    }
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  };

  return {
    isPlaying: player.playing,
    isLoaded: player.isLoaded,
    toggleSound,
  };
};

export default useCalmingSound;
